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
const connection_1 = require("../connection/connection");
const subscription_seed_1 = require("./subscription.seed");
const user_seed_1 = require("./user.seed");
function runSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.connectMongoDB)();
        let { verifiedUsers, unverifiedUsers, adminUsers } = yield (0, user_seed_1.createUsers)(10);
        // create user first so can get the user id
        // verifiedUsers = 
        const subscriptions = yield (0, subscription_seed_1.createSubscriptions)(verifiedUsers, 10);
        console.log(verifiedUsers);
        console.log(unverifiedUsers);
        console.log(subscriptions);
        yield (0, connection_1.closeMongoDB)();
    });
}
runSeed();
