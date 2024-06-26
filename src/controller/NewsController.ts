import { Request, Response } from "express";
import puppeteer from "puppeteer";
import { NewsSource, NewsSourceSearch } from "../config/NewsSources";
import { extractArticles } from "../utils/NewsUtils";
import fs from "fs";
import path from "path";
import { INewsSource } from "../contracts/dto/NewsRelated.dto";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";

// Utility function to launch a new browser instance
const launchBrowser = async () => {
  return await puppeteer.launch();
};

// // Get all news articles from the sources
// export const getAllNews = async (req: Request, res: Response) => {
//   const sources = NewsSource;
//   const allArticles: any[] = [];

//   try {
//     const browser = await launchBrowser();
//     console.log("sources", sources);

//     for (const source of sources) {
//       if (source.name === "fitandwell") {
//         try {
//           const page = await browser.newPage();
//           console.log(`Extracting articles from ${source.url}`);
//           await page.goto(source.url, {
//             waitUntil: "domcontentloaded",
//             timeout: 300000,
//           });
//           await page.waitForSelector(".listing__link", { timeout: 300000 });
//           const articles = await extractArticles(page);
//           allArticles.push(...articles);
//           await page.close();
//         } catch (error) {
//           console.error(
//             `Failed to extract articles from ${source.url}:`,
//             error
//           );
//         }
//       }
//     }

//     await browser.close();
//   } catch (error) {
//     console.error("An error occurred while extracting news:", error);
//     return res.status(500).send("An error occurred while extracting news.");
//   }

//   return res.json(allArticles);
// };

export const getFilteredNews = async (req: Request, res: Response) => {
  const isQueryEmpty = Object.keys(req.query).length === 0;
  if (isQueryEmpty) {
    const sources = NewsSource;
    const allArticles: any[] = [];

    try {
      const browser = await launchBrowser();
      console.log("sources", sources);

      for (const source of sources) {
        if (source.name === "fitandwell") {
          try {
            const page = await browser.newPage();
            console.log(`Extracting articles from ${source.url}`);
            await page.goto(source.url, {
              waitUntil: "domcontentloaded",
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
      return res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send("An error occurred while extracting news.");
    }

    return res.json(allArticles);
  }

  if (!isQueryEmpty) {
    const sources = NewsSourceSearch;
    const allArticles: any[] = [];
    try {
      const browser = await launchBrowser();

      for (const source of sources) {
        if (source.name === "fitandwell") {
          const sourceFilter = source.url + req.query.title;
          try {
            const page = await browser.newPage();
            await page.goto(sourceFilter, {
              waitUntil: "domcontentloaded",
              timeout: 300000,
            });
            await page.waitForSelector(".listing__link", { timeout: 300000 });
            const articles = await page.evaluate(() => {
              const links = Array.from(
                document.querySelectorAll(".listing__link")
              );
              return links.map((link) => {
                const title = link.querySelector(".listing__title")?.innerHTML;
                const detail = link.querySelector(
                  ".listing__text--strapline"
                )?.innerHTML;
                const type = link.querySelector(".listing__label")?.innerHTML;
                const writer = link
                  .querySelector(".listing__text--byline")
                  ?.innerHTML.split("By ")[1];
                const publishedDate = link
                  .querySelector(".date")
                  ?.getAttribute("datetime");
                const url = link.getAttribute("href");
                return { title, detail, type, writer, publishedDate, url };
              });
            });
            allArticles.push(...articles);
            await page.close();
          } catch (error) {
            console.error(
              `Failed to extract articles from ${sourceFilter}:`,
              error
            );
          }
        }
      }

      if (allArticles.length === 0) {
        console.log("No articles found.");
        await browser.close();
        return res.status(RESPONSE_STATUS.NOT_FOUND).send("No articles found.");
      }

      await browser.close();
      return res.json(allArticles);
    } catch (error) {
      console.error("An error occurred while setting up the browser:", error);
      return res
        .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
        .send("An error occurred while setting up the browser.");
    }
  }
};
// TODO : MAKE ENDPOINT FOR FILTERING NEWS https://www.fitandwell.com/search?searchTerm=hello
// // Get specific news article by title
// export const getSpecificNews = async (req: Request, res: Response) => {
//   const { title } = req.params;
//   let articleUrl = "";

//   try {
//     const browser = await launchBrowser();
//     const page = await browser.newPage();

//     for (const source of NewsSource) {
//       if (source.name === "fitandwell") {
//         try {
//           console.log(`Extracting articles from ${source.url}`);
//           await page.goto(source.url, {
//             waitUntil: "networkidle2",
//             timeout: 300000,
//           });
//           await page.waitForSelector(".listing__link", { timeout: 300000 });
//           const articles = await extractArticles(page);

//           const article = articles.find((a) => a.title?.includes(title));
//           if (article && article.url) {
//             articleUrl = article.url;
//             break;
//           }
//         } catch (error) {
//           console.error(
//             `Failed to extract articles from ${source.url}:`,
//             error
//           );
//         }
//       }
//     }

//     if (!articleUrl) {
//       await browser.close();
//       return res.status(404).send("Article not found.");
//     }

//     await page.goto(articleUrl, { waitUntil: "networkidle2", timeout: 300000 });
//     await page.waitForSelector("title", { timeout: 300000 });

//     // const data = await page.evaluate(() => {
//     //   const getTextContent = (selector: string) => {
//     //     const element = document.querySelector(selector);
//     //     return element ? element.textContent?.trim() : null;
//     //   };

//     //   const getContent = () => {
//     //     const element = document.querySelector("#article-body");
//     //     const text = element?.textContent?.trim() || "";
//     //     // const contentArray = text.split(".").map((t) => t.replace(/\n/g, ""));
//     //     function removeHtmlCssJs(str: string) {
//     //       // Remove HTML tags
//     //       str = str.replace(/<[^>]*>/g, "");

//     //       // Remove CSS styles
//     //       str = str.replace(/<style[^>]*>.*<\/style>/gm, "");

//     //       // Remove JavaScript
//     //       str = str.replace(/<script[^>]*>.*<\/script>/gm, "");

//     //       return str;
//     //     }
//     //     return removeHtmlCssJs(text);
//     //   };

//     //   const getAttributeContent = (selector: string, attribute: string) => {
//     //     const element = document.querySelector(selector);
//     //     return element ? element.getAttribute(attribute) : null;
//     //   };

//     //   const getAuthor = () => {
//     //     const scriptElement = document.querySelector(
//     //       'script[type="application/ld+json"]'
//     //     );
//     //     if (scriptElement) {
//     //       const json = JSON.parse(scriptElement.textContent || "{}");
//     //       return json.author ? json.author.name : null;
//     //     }
//     //     return null;
//     //   };

//     //   return {
//     //     title: getTextContent("title"),
//     //     description: getTextContent(".header__strapline"),
//     //     content: getContent(),
//     //     writer: getAuthor(),
//     //     publishedDate: getAttributeContent('meta[name="pub_date"]', "content"),
//     //     nextRecommendation: getTextContent('[aria-label="Next article"]'),
//     //     previousRecommendation: getTextContent(
//     //       '[aria-label="Previous article"]'
//     //     ),
//     //   };
//     // });

//     await browser.close();
//     res.json(data);
//   } catch (error) {
//     console.error(
//       "An error occurred while extracting the specific news:",
//       error
//     );
//     return res
//       .status(500)
//       .send("An error occurred while extracting the specific news.");
//   }
// };
export const getSpecificNews = async (req: Request, res: Response) => {
  // TODO : MAKE THIS ENDPOINT FOR also search the seqch query https://www.fitandwell.com/search?searchTerm=hello
  const { title } = req.params;
  let articleUrl = "";
  let selectedArticleTitle = "";
  let source: any;
  try {
    const browser = await launchBrowser();
    try {
      const page = await browser.newPage();

      for (let i = 0; i < NewsSourceSearch.length; i++) {
        source = NewsSourceSearch[i];
        if (source.name === "fitandwell") {
          const sourceFilter = source.url + title;
          try {
            console.log(`Extracting articles from ${sourceFilter}`);
            await page.goto(sourceFilter, {
              waitUntil: "domcontentloaded",
              timeout: 300000,
            });
            await page.waitForSelector(".listing__link", { timeout: 300000 });

            const articles = await extractArticles(page);
            const article = articles.find((a) => a.title?.includes(title));
            if (article && article.url) {
              selectedArticleTitle = article.title || "unknown";
              articleUrl = article.url;
              break;
            }
          } catch (error) {
            console.error(
              `Failed to extract articles from ${sourceFilter}:`,
              error
            );
          }
        }
      }

      if (!articleUrl) {
        await browser.close();
        return res.status(RESPONSE_STATUS.NOT_FOUND).send("Article not found.");
      }

      await page.goto(articleUrl, {
        waitUntil: "domcontentloaded",
        timeout: 300000,
      });
      await page.emulateMediaType("screen");

      const htmlContent = await page.content();
      await browser.close();

      const safeTitle = selectedArticleTitle.replace(/[<>:"\/\\|?*]+/g, "-");
      const filePath = path.resolve(
        __dirname,
        `../../articles/${source.name}/article_${safeTitle}.html`
      );

      // Ensure the directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      fs.writeFileSync(filePath, htmlContent);
      res.sendFile(filePath);
    } catch (error) {
      console.error(
        "An error occurred while extracting the specific news:",
        error
      );

      // Ensure the browser is closed in case of error
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Error closing the browser:", closeError);
      }

      return res
        .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
        .send("An error occurred while extracting the specific news.");
    }
  } catch (error) {}
};
