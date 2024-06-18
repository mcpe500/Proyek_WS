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
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractArticles = void 0;
// Utility function to extract articles from the page
const extractArticles = (page) => __awaiter(void 0, void 0, void 0, function* () {
    return yield page.evaluate(() => {
        const articles = Array.from(document.querySelectorAll(".listing__link"));
        return articles.map((article) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return ({
                url: article.getAttribute("href") || null,
                title: ((_b = (_a = article.querySelector(".listing__title")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || null,
                detail: ((_d = (_c = article
                    .querySelector(".listing__text--strapline")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || null,
                type: ((_f = (_e = article.querySelector(".listing__label")) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.trim()) || null,
                writer: ((_h = (_g = article.querySelector(".listing__text--byline")) === null || _g === void 0 ? void 0 : _g.textContent) === null || _h === void 0 ? void 0 : _h.trim()) ||
                    null,
                publishedDate: new Date((_l = (_k = (_j = article
                    .querySelector(".date.byline__time")) === null || _j === void 0 ? void 0 : _j.getAttribute("datetime")) === null || _k === void 0 ? void 0 : _k.toString()) !== null && _l !== void 0 ? _l : "").toUTCString() || null,
            });
        });
    });
});
exports.extractArticles = extractArticles;
