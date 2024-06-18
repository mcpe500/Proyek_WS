"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificNews = exports.getFilteredNews = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const NewsSources_1 = require("../config/NewsSources");
const NewsUtils_1 = require("../utils/NewsUtils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Utility function to launch a new browser instance
const launchBrowser = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield puppeteer_1.default.launch();
});
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
const getFilteredNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isQueryEmpty = Object.keys(req.query).length === 0;
    if (isQueryEmpty) {
        const sources = NewsSources_1.NewsSource;
        const allArticles = [];
        try {
            const browser = yield launchBrowser();
            console.log("sources", sources);
            for (const source of sources) {
                if (source.name === "fitandwell") {
                    try {
                        const page = yield browser.newPage();
                        console.log(`Extracting articles from ${source.url}`);
                        yield page.goto(source.url, {
                            waitUntil: "domcontentloaded",
                            timeout: 300000,
                        });
                        yield page.waitForSelector(".listing__link", { timeout: 300000 });
                        const articles = yield (0, NewsUtils_1.extractArticles)(page);
                        allArticles.push(...articles);
                        yield page.close();
                    }
                    catch (error) {
                        console.error(`Failed to extract articles from ${source.url}:`, error);
                    }
                }
            }
            yield browser.close();
        }
        catch (error) {
            console.error("An error occurred while extracting news:", error);
            return res.status(500).send("An error occurred while extracting news.");
        }
        return res.json(allArticles);
    }
    if (!isQueryEmpty) {
        const sources = NewsSources_1.NewsSourceSearch;
        const allArticles = [];
        try {
            const browser = yield launchBrowser();
            for (const source of sources) {
                if (source.name === "fitandwell") {
                    const sourceFilter = source.url + req.query.title;
                    try {
                        const page = yield browser.newPage();
                        yield page.goto(sourceFilter, {
                            waitUntil: "domcontentloaded",
                            timeout: 300000,
                        });
                        yield page.waitForSelector(".listing__link", { timeout: 300000 });
                        const articles = yield page.evaluate(() => {
                            const links = Array.from(document.querySelectorAll(".listing__link"));
                            return links.map((link) => {
                                var _a, _b, _c, _d, _e;
                                const title = (_a = link.querySelector(".listing__title")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                                const detail = (_b = link.querySelector(".listing__text--strapline")) === null || _b === void 0 ? void 0 : _b.innerHTML;
                                const type = (_c = link.querySelector(".listing__label")) === null || _c === void 0 ? void 0 : _c.innerHTML;
                                const writer = (_d = link
                                    .querySelector(".listing__text--byline")) === null || _d === void 0 ? void 0 : _d.innerHTML.split("By ")[1];
                                const publishedDate = (_e = link
                                    .querySelector(".date")) === null || _e === void 0 ? void 0 : _e.getAttribute("datetime");
                                const url = link.getAttribute("href");
                                return { title, detail, type, writer, publishedDate, url };
                            });
                        });
                        allArticles.push(...articles);
                        yield page.close();
                    }
                    catch (error) {
                        console.error(`Failed to extract articles from ${sourceFilter}:`, error);
                    }
                }
            }
            if (allArticles.length === 0) {
                console.log("No articles found.");
                yield browser.close();
                return res.status(404).send("No articles found.");
            }
            yield browser.close();
            return res.json(allArticles);
        }
        catch (error) {
            console.error("An error occurred while setting up the browser:", error);
            return res
                .status(500)
                .send("An error occurred while setting up the browser.");
        }
    }
});
exports.getFilteredNews = getFilteredNews;
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
const getSpecificNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO : MAKE THIS ENDPOINT FOR also search the seqch query https://www.fitandwell.com/search?searchTerm=hello
    const { title } = req.params;
    let articleUrl = "";
    let selectedArticleTitle = "";
    let source;
    try {
        const browser = yield launchBrowser();
        try {
            const page = yield browser.newPage();
            for (let i = 0; i < NewsSources_1.NewsSourceSearch.length; i++) {
                source = NewsSources_1.NewsSourceSearch[i];
                if (source.name === "fitandwell") {
                    const sourceFilter = source.url + title;
                    try {
                        console.log(`Extracting articles from ${sourceFilter}`);
                        yield page.goto(sourceFilter, {
                            waitUntil: "domcontentloaded",
                            timeout: 300000,
                        });
                        yield page.waitForSelector(".listing__link", { timeout: 300000 });
                        const articles = yield (0, NewsUtils_1.extractArticles)(page);
                        const article = articles.find((a) => { var _a; return (_a = a.title) === null || _a === void 0 ? void 0 : _a.includes(title); });
                        if (article && article.url) {
                            selectedArticleTitle = article.title || "unknown";
                            articleUrl = article.url;
                            break;
                        }
                    }
                    catch (error) {
                        console.error(`Failed to extract articles from ${sourceFilter}:`, error);
                    }
                }
            }
            if (!articleUrl) {
                yield browser.close();
                return res.status(404).send("Article not found.");
            }
            yield page.goto(articleUrl, {
                waitUntil: "domcontentloaded",
                timeout: 300000,
            });
            yield page.emulateMediaType("screen");
            const htmlContent = yield page.content();
            yield browser.close();
            const safeTitle = selectedArticleTitle.replace(/[<>:"\/\\|?*]+/g, "-");
            const filePath = path_1.default.resolve(__dirname, `../../articles/${source.name}/article_${safeTitle}.html`);
            // Ensure the directory exists
            fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
            fs_1.default.writeFileSync(filePath, htmlContent);
            res.sendFile(filePath);
        }
        catch (error) {
            console.error("An error occurred while extracting the specific news:", error);
            // Ensure the browser is closed in case of error
            try {
                yield browser.close();
            }
            catch (closeError) {
                console.error("Error closing the browser:", closeError);
            }
            return res
                .status(500)
                .send("An error occurred while extracting the specific news.");
        }
    }
    catch (error) { }
});
exports.getSpecificNews = getSpecificNews;
