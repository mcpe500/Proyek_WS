"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionDetailType = exports.TransactionHeaderType = void 0;
var TransactionHeaderType;
(function (TransactionHeaderType) {
    TransactionHeaderType["TOPUP"] = "TOPUP";
    TransactionHeaderType["SUBSCRIBE"] = "SUBSCRIBE";
})(TransactionHeaderType || (exports.TransactionHeaderType = TransactionHeaderType = {}));
var TransactionDetailType;
(function (TransactionDetailType) {
    TransactionDetailType["ADMIN_TOPUP"] = "ADMIN_TOPUP";
    TransactionDetailType["ADMIN_SUBSCRIBE"] = "ADMIN_SUBSCRIBE";
    TransactionDetailType["USER_TOPUP"] = "USER_TOPUP";
    TransactionDetailType["USER_SUBSCRIBE"] = "USER_SUBSCRIBE";
    TransactionDetailType["USER_RENEW"] = "USER_RENEW";
})(TransactionDetailType || (exports.TransactionDetailType = TransactionDetailType = {}));
