"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDate = void 0;
const date_fns_1 = require("date-fns");
const getCurrentDate = (format) => {
    const date = new Date();
    return (0, date_fns_1.format)(date, format);
};
exports.getCurrentDate = getCurrentDate;
