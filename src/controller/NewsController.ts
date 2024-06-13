import { Request, Response } from "express";
import puppeteer from "puppeteer";
import { NewsSource } from "../config/NewsSources";
import { extractArticles } from "../utils/NewsUtils";



export const getAllNews = async (req: Request, res: Response) => {
  const sources = NewsSource;
  const browser = await puppeteer.launch();
  const allArticles: any[] = [];

  try {
    for (const source of sources) {
      if (source.name === "fitandwell") {
        try {
          const page = await browser.newPage();
          await page.goto(source.url, { waitUntil: "networkidle2" });
          await page.waitForSelector(".listing__link", { timeout: 10000 });
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
  } catch (error) {
    console.error("An error occurred while extracting news:", error);
    res.status(500).send("An error occurred while extracting news.");
    return;
  } finally {
    await browser.close();
  }

  return res.json(allArticles);
};

export const getSpecificNews = async (req: Request, res: Response) => {
  const { title } = req.params;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //   try {
  //     const page = await browser.newPage();
  //     await page.goto(source.url, { waitUntil: "networkidle2" });
  //     await page.waitForSelector(".listing__link", { timeout: 10000 });
  //     const articles = await extractArticles(page);
  //     allArticles.push(...articles);
  //     await page.close();
  //   } catch (error) {
  //     console.error(`Failed to extract articles from ${source.url}:`, error);
  //   }
  try {
    // const page = await browser.newPage();
    // await page.goto(NewsSource[0].url, { waitUntil: "networkidle2" });
    // await page.waitForSelector(".listing__link", { timeout: 10000 });
    // const articles = await extractArticles(page);

    // await page.close();

    const url =
      "https://www.fitandwell.com/news/these-exercises-are-an-absolute-game-changer-a-trainer-shares-her-10-minute-pilates-routine-for-strengthening-deep-core-muscles";
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("title", { timeout: 10000 });

    const data = await page.evaluate(() => {
      const getTextContent = (selector: string) => {
        const element = document.querySelector(selector);
        return element ? element.textContent?.trim() : null;
      };

      const getContent = () => {
        const element = document.querySelector("#article-body");
        const text = element?.textContent?.trim() || "";
        const contentArray = text.split(".").map((t) => t.replaceAll("\n", ""));

        const filterAndFormatContent = (content: string[]) => {
          const filteredContent = content.filter(
            (line) =>
              !line.includes("Sponsored Links") &&
              !line.includes("Promoted Links") &&
              !line.includes("window") &&
              !line.includes("catch(err => console") &&
              !line.includes("error")
          );

          let formattedContent = "";
          filteredContent.forEach((line, index) => {
            if (index === 0) {
              formattedContent += `# ${line}\n\n`;
            } else if (line.startsWith(" ")) {
              formattedContent += `## ${line.trim()}\n\n`;
            } else {
              formattedContent += `${line}\n\n`;
            }
          });

          return formattedContent;
        };

        return filterAndFormatContent(contentArray);
      };

      const getAttributeContent = (selector: string, attribute: string) => {
        const element = document.querySelector(selector);
        return element ? element.getAttribute(attribute) : null;
      };

      const getNextRecommendation = () => {
        const nextElement = document.querySelector(
          '[aria-label="Next article"]'
        );
        return nextElement ? (nextElement as HTMLAnchorElement).href : null;
      };

      const getPreviousRecommendation = () => {
        const prevElement = document.querySelector(
          '[aria-label="Previous article"]'
        );
        return prevElement ? (prevElement as HTMLAnchorElement).href : null;
      };

      const getAuthor = () => {
        const authorElement = document.querySelector(
          'script[type="application/ld+json"]'
        );
        if (authorElement) {
          const json = JSON.parse(authorElement.textContent || "{}");
          return json.author ? json.author.name : null;
        }
        return null;
      };

      return {
        title: getTextContent("title"),
        description: getTextContent(".header__strapline"),
        content: getContent(),
        nextRecommendation: getNextRecommendation(),
        previousRecommendation: getPreviousRecommendation(),
        writer: getAuthor(),
        publishedDate: getAttributeContent('meta[name="pub_date"]', "content"),
      };
    });

    res.json(data);
  } catch (error) {
    console.error(
      "An error occurred while extracting the specific news:",
      error
    );
    res
      .status(500)
      .send("An error occurred while extracting the specific news.");
  } finally {
    await browser.close();
  }
};
