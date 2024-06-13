import { Page } from "puppeteer";

export const extractArticles = async (page: Page) => {
  return await page.evaluate(() => {
    const articleElements = Array.from(
      document.querySelectorAll(".listing__link")
    );
    return articleElements.map((articleElement) => {
      const url = articleElement.getAttribute("href") || null;
      const title =
        articleElement.querySelector(".listing__title")?.textContent?.trim() ||
        null;
      const detail =
        articleElement
          .querySelector(".listing__text--strapline")
          ?.textContent?.trim() || null;
      const type =
        articleElement.querySelector(".listing__label")?.textContent?.trim() ||
        null;
      const writer =
        articleElement
          .querySelector(".listing__text--byline")
          ?.textContent?.trim() || null;
      const publishedDate =
        articleElement
          .querySelector(".date.byline__time")
          ?.getAttribute("datetime") || null;
      return { url, title, detail, type, writer, publishedDate };
    });
  });
};
