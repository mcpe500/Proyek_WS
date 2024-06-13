import { Page } from "puppeteer";

// Utility function to extract articles from the page
export const extractArticles = async (page: Page) => {
  return await page.evaluate(() => {
    const articles = Array.from(document.querySelectorAll(".listing__link"));
    return articles.map((article) => ({
      url: article.getAttribute("href") || null,
      title:
        article.querySelector(".listing__title")?.textContent?.trim() || null,
      detail:
        article
          .querySelector(".listing__text--strapline")
          ?.textContent?.trim() || null,
      type:
        article.querySelector(".listing__label")?.textContent?.trim() || null,
      writer:
        article
          .querySelector(".listing__text--byline")
          ?.textContent?.trim()
          .split("\n") || null,
      publishedDate:
        new Date(
          article
            .querySelector(".date.byline__time")
            ?.getAttribute("datetime")
            ?.toString() ?? ""
        ).toUTCString() || null,
    }));
  });
};
