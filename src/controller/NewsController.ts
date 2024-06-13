import { Request, Response } from "express";
import puppeteer from "puppeteer";
import { NewsSource } from "../config/NewsSources";
import { extractArticles } from "../utils/NewsUtils";

// Utility function to launch a new browser instance
const launchBrowser = async () => {
  return await puppeteer.launch();
};

// Get all news articles from the sources
export const getAllNews = async (req: Request, res: Response) => {
  const sources = NewsSource;
  const allArticles: any[] = [];

  try {
    const browser = await launchBrowser();

    for (const source of sources) {
      if (source.name === "fitandwell") {
        try {
          const page = await browser.newPage();
          console.log(`Extracting articles from ${source.url}`);
          await page.goto(source.url, {
            waitUntil: "networkidle2",
            timeout: 300000,
          });
          await page.waitForSelector(".listing__link", { timeout: 300000 });
          const articles = await extractArticles(page);
          allArticles.push(...articles);
          await page.close();
        } catch (error) {
          console.error(
            `Failed to extract articles from ${source.url}:`,
            error
          );
        }
      }
    }

    await browser.close();
  } catch (error) {
    console.error("An error occurred while extracting news:", error);
    return res.status(500).send("An error occurred while extracting news.");
  }

  return res.json(allArticles);
};

// Get specific news article by title
export const getSpecificNews = async (req: Request, res: Response) => {
  const { title } = req.params;
  let articleUrl = "";

  try {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    for (const source of NewsSource) {
      if (source.name === "fitandwell") {
        try {
          console.log(`Extracting articles from ${source.url}`);
          await page.goto(source.url, {
            waitUntil: "networkidle2",
            timeout: 300000,
          });
          await page.waitForSelector(".listing__link", { timeout: 300000 });
          const articles = await extractArticles(page);

          const article = articles.find((a) => a.title?.includes(title));
          if (article && article.url) {
            articleUrl = article.url;
            break;
          }
        } catch (error) {
          console.error(
            `Failed to extract articles from ${source.url}:`,
            error
          );
        }
      }
    }

    if (!articleUrl) {
      await browser.close();
      return res.status(404).send("Article not found.");
    }

    await page.goto(articleUrl, { waitUntil: "networkidle2", timeout: 300000 });
    await page.waitForSelector("title", { timeout: 300000 });

    const data = await page.evaluate(() => {
      const getTextContent = (selector: string) => {
        const element = document.querySelector(selector);
        return element ? element.textContent?.trim() : null;
      };

      const getContent = () => {
        const element = document.querySelector("#article-body");
        const text = element?.textContent?.trim() || "";
        // const contentArray = text.split(".").map((t) => t.replace(/\n/g, ""));
        function removeHtmlCssJs(str: string) {
          // Remove HTML tags
          str = str.replace(/<[^>]*>/g, "");

          // Remove CSS styles
          str = str.replace(/<style[^>]*>.*<\/style>/gm, "");

          // Remove JavaScript
          str = str.replace(/<script[^>]*>.*<\/script>/gm, "");

          return str;
        }
        return removeHtmlCssJs(text);
      };

      const getAttributeContent = (selector: string, attribute: string) => {
        const element = document.querySelector(selector);
        return element ? element.getAttribute(attribute) : null;
      };

      const getAuthor = () => {
        const scriptElement = document.querySelector(
          'script[type="application/ld+json"]'
        );
        if (scriptElement) {
          const json = JSON.parse(scriptElement.textContent || "{}");
          return json.author ? json.author.name : null;
        }
        return null;
      };

      return {
        title: getTextContent("title"),
        description: getTextContent(".header__strapline"),
        content: getContent(),
        writer: getAuthor(),
        publishedDate: getAttributeContent('meta[name="pub_date"]', "content"),
        nextRecommendation: getTextContent('[aria-label="Next article"]'),
        previousRecommendation: getTextContent(
          '[aria-label="Previous article"]'
        ),
      };
    });

    await browser.close();
    res.json(data);
  } catch (error) {
    console.error(
      "An error occurred while extracting the specific news:",
      error
    );
    return res
      .status(500)
      .send("An error occurred while extracting the specific news.");
  }
};
