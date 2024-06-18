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
exports.topupFromAdmin = exports.addExercise = exports.deleteUserPacket = exports.addUserPacket = exports.getUserPacket = exports.deleteUserProfile = exports.getUserProfilePicture = exports.getUserProfile = exports.adminDashboard = exports.getAllUser = exports.renewSubscription = exports.subscribePacket = exports.topup = exports.resetApiKey = exports.getApiKey = exports.verifyEmail = exports.generateNewAccessToken = exports.newRefreshToken = exports.editProfile = exports.getProfPic = exports.getDashboard = exports.loginUser = exports.registerUser = void 0;
const AuthUtils_1 = require("../utils/AuthUtils");
const ResponseRelated_enum_1 = require("../contracts/enum/ResponseRelated.enum");
const User_model_1 = require("../models/dynamic/User.model");
const Paket_model_1 = __importDefault(require("../models/static/Paket.model"));
const Subscription_model_1 = require("../models/dynamic/Subscription.model");
const Exercise_model_1 = require("../models/dynamic/Exercise.model");
const ApiService_1 = require("../services/ApiService");
const TransactionRelated_enum_1 = require("../contracts/enum/TransactionRelated.enum");
const Transaction_model_1 = require("../models/dynamic/Transaction.model");
const Topup_validate_1 = require("../validators/Topup.validate");
const mongoose_1 = __importDefault(require("mongoose"));
const UserRelated_enum_1 = require("../contracts/enum/UserRelated.enum");
// const UserSchema: Schema = new Schema({
//   fullName: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },
//   age: { type: Number, required: true },
//   gender: { type: String, required: true },
//   height: { type: Number, required: true },
//   weight: { type: Number, required: true },
//   healthInformation: { type: String, required: true },
//   refreshToken: { type: String },
//   isEmailVerified: { type: Boolean, default: false },
//   emailVerificationToken: { type: String },
// });
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, fullName, phone } = req.body;
    try {
        const existingUser = yield User_model_1.User.findOne({ $or: [{ username }, { email }] }); //
        if (existingUser) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                .json({ msg: "Username or email already exists" });
        }
        const hashedPassword = yield (0, AuthUtils_1.hashPassword)(password);
        const emailToken = (0, AuthUtils_1.generateEmailVerificationToken)(email);
        const newUser = new User_model_1.User({
            username,
            email,
            password: hashedPassword,
            fullName,
            phone,
            isEmailVerified: false,
            emailVerificationToken: emailToken,
        });
        const savedUser = yield newUser.save();
        const respone = {
            username: savedUser.username,
            email: savedUser.email,
            fullName: savedUser.email,
            phone: savedUser.phone,
            _id: savedUser._id,
        };
        yield (0, AuthUtils_1.sendVerificationEmail)(email, emailToken, username);
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.CREATED).json({
            msg: "Register Successful, please verify your email within 24 hours!",
            user: respone,
        });
    }
    catch (error) {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, rememberMe } = req.body;
    // console.log(req.body);
    const user = yield User_model_1.User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ msg: "Invalid credentials" });
    }
    if (!user.isEmailVerified) {
        if (!(0, AuthUtils_1.verifyEmailVerificationToken)(user.emailVerificationToken)) {
            yield User_model_1.User.deleteOne({ _id: user._id });
            return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST).send({
                message: "Your email verification token has expired and as a result, your account has been deleted",
            });
        }
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .send({ message: "Please verify your email" });
    }
    const isPasswordValid = yield (0, AuthUtils_1.verifyPassword)(password, user.password);
    if (!isPasswordValid) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ msg: "Invalid credentials" });
    }
    const dataToToken = {
        username: username,
        email: email,
    };
    const accessToken = (0, AuthUtils_1.createAccessToken)(dataToToken, rememberMe);
    const refreshToken = (0, AuthUtils_1.createRefreshToken)(dataToToken, rememberMe);
    yield user.updateOne({
        refreshToken: refreshToken,
        accessToken: accessToken,
    });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({
        msg: "Logged in successfully",
        token: accessToken,
    });
});
exports.loginUser = loginUser;
const getDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const { username, email } = req.body;
    //   const user = await User.findOne({ $or: [{ username }, { email }] });
    const user = req.user;
    return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({ user: user });
});
exports.getDashboard = getDashboard;
const getProfPic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    return res.sendFile(user.profilePicture, { root: "." });
});
exports.getProfPic = getProfPic;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { old_password, new_password, confirm_password, fullName, phone, age, gender, height, weight, healthInformation, } = req.body;
    const user = req.user;
    // console.log(user);
    if (!user) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ message: "User not found" });
    }
    if (old_password && old_password != "") {
        const isPasswordValid = yield (0, AuthUtils_1.verifyPassword)(old_password, user.password);
        if (!isPasswordValid) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                .json({ msg: "old_password is incorrect" });
        }
        if (new_password && new_password == "") {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                .json({ msg: "new_password must not be empty" });
        }
        if (new_password != confirm_password) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                .json({ msg: "confirm_password does not match" });
        }
        const hashedPassword = yield (0, AuthUtils_1.hashPassword)(new_password);
        // Update password
        user.password = hashedPassword;
    }
    // Update other fields if they are not empty
    if (fullName && fullName != "")
        user.fullName = fullName;
    if (phone && phone != "")
        user.phone = phone;
    if (age && age != "")
        user.age = age;
    if (gender && gender != "")
        user.gender = gender;
    if (height && height != "")
        user.height = height;
    if (weight && weight != "")
        user.weight = weight;
    if (healthInformation && healthInformation != "")
        user.healthInformation = healthInformation;
    if (req.file)
        user.profilePicture = req.file.path;
    // Save the updated user
    yield user.save();
    return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({ user: user });
});
exports.editProfile = editProfile;
const newRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    try {
        const decoded = (0, AuthUtils_1.verifyRefreshToken)(refreshToken);
        const user = yield User_model_1.User.findOne({
            $or: [{ username: decoded.username }, { email: decoded.email }],
        });
        if (!user) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                .json({ message: "User not found" });
        }
        const dataToToken = {
            username: user.username,
            email: user.email,
        };
        const newRefreshToken = (0, AuthUtils_1.createRefreshToken)(dataToToken, false);
        yield user.updateOne({ refreshToken: newRefreshToken });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS)
            .json({ message: "Refresh token generated successfully" });
    }
    catch (err) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.FORBIDDEN)
            .json({ message: "Invalid refresh token" });
    }
});
exports.newRefreshToken = newRefreshToken;
const generateNewAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    try {
        const decoded = (0, AuthUtils_1.verifyRefreshToken)(refreshToken);
        // console.log("decoded : ", decoded);
        const user = yield User_model_1.User.findOne({
            $or: [{ username: decoded.username }, { email: decoded.email }],
        });
        // console.log(user);
        if (!user) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                .json({ message: "User not found" });
        }
        const dataToToken = {
            username: user.username,
            email: user.email,
        };
        const accessToken = (0, AuthUtils_1.createAccessToken)(dataToToken, false);
        yield user.updateOne({ accessToken: accessToken });
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({ accessToken });
    }
    catch (err) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.FORBIDDEN)
            .json({ message: "Invalid refresh token" });
    }
});
exports.generateNewAccessToken = generateNewAccessToken;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailVerificationToken } = req.params;
    try {
        const decoded = (0, AuthUtils_1.verifyEmailVerificationToken)(emailVerificationToken);
        const user = yield User_model_1.User.findOne({
            emailVerificationToken: emailVerificationToken,
        });
        if ((user === null || user === void 0 ? void 0 : user.email) != (decoded === null || decoded === void 0 ? void 0 : decoded.email)) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.FORBIDDEN)
                .json({ message: "Invalid email verification token" });
        }
        if (!user) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                .json({ message: "User not found" });
        }
        // TODO : (Make sure it works)Bikin ngasi ApiKey waktu subscribe, sama Api Key masuk ke subscription udh bukan di user (DONE, Hansen)
        let apiKey = yield (0, AuthUtils_1.generateApiKey)();
        yield user.updateOne({
            isEmailVerified: true,
            emailVerificationToken: null,
        });
        const subscription = new Subscription_model_1.Subscription({
            userId: user._id,
            paketId: "PAK001",
            endDate: new Date("9999-12-31T23:59:59.999Z"),
            resetAt: new Date(new Date().getTime() + 60 * 1000),
            apiKey: apiKey,
        });
        yield subscription.save();
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS)
            .send({ message: "Email verified" });
    }
    catch (err) {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.FORBIDDEN).json({
            message: "Invalid email verification token or your email verification token has expired",
        });
    }
});
exports.verifyEmail = verifyEmail;
// TODO bikin ini response nya, list of ApiKey dari subscribe yg usernya lagi login (DONE, Hansen)
const getApiKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const subscribe = yield Subscription_model_1.Subscription.findOne({ userId: user._id });
    try {
        // Jika pengguna ditemukan, kirimkan API key
        if (subscribe.apiKey) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS)
                .json({ apiKey: subscribe.apiKey });
        }
        else {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                .json({ msg: "API key not found for this user" });
        }
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
});
exports.getApiKey = getApiKey;
// TODO bikin ini supaya ngereset apikey dari subscription (DONE, Hansen)
const resetApiKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        let newApiKey = yield (0, AuthUtils_1.generateApiKey)();
        const updatedSubscribe = yield Subscription_model_1.Subscription.findOneAndUpdate({ userId: user._id }, { $set: { apiKey: newApiKey } }, { new: true, useFindAndModify: false } // Returns the updated document
        );
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS)
            .json({ apiKey: updatedSubscribe.apiKey });
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
});
exports.resetApiKey = resetApiKey;
const topup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    const user = req.user;
    if (!amount || amount <= 0) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ message: "Invalid amount" });
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const transactionHeader = {
            transactionHeaderType: TransactionRelated_enum_1.TransactionHeaderType.TOPUP,
            date: new Date(),
            total: amount,
            userId: user._id,
        };
        const transactionDetails = [
            {
                transactionDetailType: TransactionRelated_enum_1.TransactionDetailType.USER_TOPUP,
                subtotal: amount,
                message: `User: ${user.username}, does action = ${TransactionRelated_enum_1.TransactionDetailType.USER_TOPUP} with amount = ${amount}`,
            },
        ];
        const transaction = {
            header: transactionHeader,
            details: transactionDetails,
        };
        yield Transaction_model_1.Transaction.create([transaction], { session });
        user.balance += amount;
        yield user.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({
            message: "Balance updated successfully.",
            currentBalance: user.balance,
        });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    }
});
exports.topup = topup;
// TODO bikin ini supaya ada api key nya
const subscribePacket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptions = req.body; // This should be an array of { paketId, month }
    const user = req.user;
    if (!Array.isArray(subscriptions)) {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST).json({
            message: "Invalid request format. Expected an array of subscriptions.",
        });
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const transactionDetails = [];
        for (const sub of subscriptions) {
            const { paketId, month } = sub;
            if (!paketId || !month) {
                throw {
                    status: ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST,
                    message: `Request fields not valid`,
                };
            }
            const paket = yield Paket_model_1.default.findOne({
                where: {
                    Paket_id: paketId,
                },
            });
            if (!paket) {
                throw {
                    status: ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND,
                    message: `Paket not found: ${paketId}`,
                };
            }
            if (paketId === "PAK001") {
                throw {
                    status: ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST,
                    message: `You can't subscribe to this paket: ${paketId}`,
                };
            }
            if (month < 1) {
                throw {
                    status: ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST,
                    message: `Invalid number of months for paket: ${paketId}`,
                };
            }
            // Check balance
            const totalCost = paket.Paket_price * parseInt(month);
            if (user.balance < totalCost) {
                throw {
                    status: ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST,
                    message: "Not enough balance! Please top up first",
                };
            }
            // Update balance
            user.balance -= totalCost;
            yield user.save({ session });
            let endDate = new Date();
            endDate.setMonth(endDate.getMonth() + parseInt(month));
            endDate.setDate(endDate.getDate() - 1);
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setSeconds(59);
            // Insert subscription
            const apiKey = yield (0, AuthUtils_1.generateApiKey)();
            const subscription = new Subscription_model_1.Subscription({
                userId: user._id,
                paketId,
                endDate,
                apiKey,
                resetAt: new Date(new Date().getTime() + 60 * 1000),
            });
            yield subscription.save({ session });
            transactionDetails.push({
                transactionDetailType: TransactionRelated_enum_1.TransactionDetailType.USER_SUBSCRIBE,
                paket_id: paketId,
                subscription_id: subscription._id,
                month: month,
                price: paket.Paket_price,
                subtotal: totalCost,
                message: `User: ${user.username} bought a subscription to ${paket.Paket_name} for ${month} month(s) at Rp${paket.Paket_price} per month.`,
            });
        }
        // Insert transaction log
        const transaction = new Transaction_model_1.Transaction({
            header: {
                transactionHeaderType: TransactionRelated_enum_1.TransactionHeaderType.SUBSCRIBE,
                date: new Date(),
                total: transactionDetails.reduce((acc, detail) => acc + detail.subtotal, 0),
                userId: user._id,
            },
            details: transactionDetails,
        });
        yield transaction.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.CREATED).json({
            message: "All subscriptions created successfully",
            transaction: transaction.header,
            subscriptions: transactionDetails,
            remainingBalance: `Rp${user.balance}`,
        });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        // Ensure the error has status and message properties
        const status = error.status || ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR;
        const errorMessage = error.message || "Internal server error";
        return res.status(status).json({ message: errorMessage });
    }
});
exports.subscribePacket = subscribePacket;
const renewSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apiKey } = req.query;
    const { month } = req.body;
    const user = req.user;
    if (month < 1) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ message: "Invalid number of months" });
    }
    if (typeof apiKey !== "string") {
        return res.status(400).json({ error: "Invalid API key format" });
    }
    // Check active subscription
    const activeSubscription = yield Subscription_model_1.Subscription.findOne({
        userId: user._id,
        apiKey: apiKey,
    });
    if (!activeSubscription) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ message: "No active subscription found" });
    }
    if (!activeSubscription.isActive || activeSubscription.endDate < new Date()) {
        yield activeSubscription.updateOne({
            isActive: false,
        });
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ msg: "Your subscription has expired" });
    }
    if (activeSubscription.paketId == "PAK001") {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ message: "This paket can't be renewed" });
    }
    const paket = yield Paket_model_1.default.findOne({
        where: {
            Paket_id: activeSubscription.paketId,
        },
    });
    if (!paket) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ message: "Invalid paket" });
    }
    // Check balance
    const totalCost = paket.Paket_price * parseInt(month);
    if (user.balance < totalCost) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ message: "Not enough balance! Please top up first" });
    }
    // Update balance
    try {
        user.balance -= totalCost;
        yield user.save();
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    }
    // Update subscription endDate
    let endDate = new Date(activeSubscription.endDate);
    endDate.setMonth(endDate.getMonth() + parseInt(month));
    activeSubscription.endDate = endDate;
    try {
        yield activeSubscription.save();
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to update subscription" });
    }
    return res
        .status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS)
        .json({ subscription: activeSubscription });
});
exports.renewSubscription = renewSubscription;
//admin
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, fullName, role } = req.query;
    // Construct the query object
    const query = {};
    if (typeof username === "string") {
        query.username = { $regex: new RegExp(username) }; // Case-sensitive
    }
    if (typeof email === "string") {
        query.email = { $regex: new RegExp(email) }; // Case-sensitive
    }
    if (typeof fullName === "string") {
        query.fullName = { $regex: new RegExp(fullName) }; // Case-sensitive
    }
    if (typeof role === "string") {
        query.role = role;
    }
    try {
        const users = yield User_model_1.User.find(query);
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({ users });
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to fetch users" });
    }
});
exports.getAllUser = getAllUser;
const adminDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { user } = req as any; // TODO : CHECK IF NECESSARY
    const users = yield User_model_1.User.find({
        role: { $eq: UserRelated_enum_1.ROLE.USER },
        isEmailVerified: true,
    }).exec();
    const transactions = yield Transaction_model_1.Transaction.find({ header: { adminId: null } });
    // transaction through top up
    const totalIncome = transactions.reduce((acc, transaction) => acc +
        transaction.details.reduce((acc, detail) => detail.transactionDetailType === TransactionRelated_enum_1.TransactionDetailType.USER_TOPUP
            ? acc + detail.subtotal
            : acc, 0), 0);
    //transaction through subscription
    const totalSpend = transactions.reduce((acc, transaction) => acc +
        transaction.details.reduce((acc, detail) => detail.transactionDetailType === TransactionRelated_enum_1.TransactionDetailType.USER_SUBSCRIBE || detail.transactionDetailType === TransactionRelated_enum_1.TransactionDetailType.USER_RENEW
            ? acc + detail.subtotal
            : acc, 0), 0);
    const totalTransactionAmount = transactions == null
        ? 0
        : transactions.reduce((acc, transaction) => acc + transaction.header.total, 0);
    const subscription = yield Subscription_model_1.Subscription.find({ isActive: true }).exec();
    return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({
        total_user: users.length,
        free_package_user: subscription.filter((item) => item.paketId == "PAK001")
            .length,
        non_free_package_user: subscription.filter((item) => item.paketId != "PAK001").length,
        total_income: totalIncome,
        total_user_spend: totalSpend,
        total_transaction_amount: totalTransactionAmount,
    });
});
exports.adminDashboard = adminDashboard;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const user = yield User_model_1.User.findOne({ _id: userID });
    if (!user)
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "User not found" });
    return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({
        username: user.username,
        full_name: user.fullName,
        email: user.email,
        phone: user.phone,
        balance: user.balance,
    });
});
exports.getUserProfile = getUserProfile;
const getUserProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const user = yield User_model_1.User.findOne({ _id: userID });
    if (!user)
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "User not found" });
    return res.sendFile(user.profilePicture, { root: "." });
});
exports.getUserProfilePicture = getUserProfilePicture;
const deleteUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const user = yield User_model_1.User.findOne({ _id: userID });
    if (!user)
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "User not found" });
    const subscription = yield Subscription_model_1.Subscription.findOne({
        userId: userID,
        isActive: true,
    });
    if (subscription)
        yield subscription.updateOne({ isActive: false });
    yield User_model_1.User.deleteOne({ _id: user._id });
    return res
        .status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS)
        .json({ msg: `User "${user.username}" deleted successfully` });
});
exports.deleteUserProfile = deleteUserProfile;
const getUserPacket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const user = yield User_model_1.User.findOne({ _id: userID });
    if (!user)
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "User not found" });
    const subscription = yield Subscription_model_1.Subscription.findOne({
        userId: userID,
        isActive: true,
    });
    if (!subscription)
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "User doesn't have any subscription" });
    const packet = yield Paket_model_1.default.findOne({
        where: { Paket_id: subscription.paketId },
    });
    if (!packet)
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "Packet not found" });
    return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({
        username: user.username,
        nama: user.fullName,
        subscription_start: subscription.startDate,
        subscription_end: subscription.endDate,
        packet: packet,
    });
});
exports.getUserPacket = getUserPacket;
const addUserPacket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const admin = req.user;
    const subscriptions = req.body; // This should be an array of { paket_id, month }
    if (!Array.isArray(subscriptions)) {
        return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST).json({
            message: "Invalid request format. Expected an array of subscriptions.",
        });
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const users = userID === "ALL"
            ? yield User_model_1.User.find({ isEmailVerified: true, role: UserRelated_enum_1.ROLE.USER })
            : [yield User_model_1.User.findOne({ _id: userID })];
        if (users.length === 0 || users[0] === null) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
                .json({ msg: "User not found" });
        }
        const transactionDetails = [];
        for (const user of users) {
            for (const sub of subscriptions) {
                const { paket_id, month } = sub;
                if (!paket_id || month === undefined) {
                    throw {
                        status: ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST,
                        message: `Request fields not valid`,
                    };
                }
                if (month < 1) {
                    throw {
                        status: ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST,
                        message: `Invalid number of months for paket: ${paket_id}`,
                    };
                }
                const paket = yield Paket_model_1.default.findOne({
                    where: {
                        Paket_id: paket_id,
                    },
                });
                if (!paket) {
                    throw {
                        status: ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND,
                        message: `Paket not found: ${paket_id}`,
                    };
                }
                // Deactivate current active subscription if it exists
                const activeSubscription = yield Subscription_model_1.Subscription.findOne({
                    userId: userID,
                    isActive: true,
                });
                if (activeSubscription) {
                    yield activeSubscription.updateOne({ isActive: false });
                }
                let endDate = new Date();
                endDate.setMonth(endDate.getMonth() + month);
                endDate.setDate(endDate.getDate() - 1);
                endDate.setHours(23);
                endDate.setMinutes(59);
                endDate.setSeconds(59);
                const apiKey = yield (0, AuthUtils_1.generateApiKey)();
                // Create new subscription
                const subs = new Subscription_model_1.Subscription({
                    userId: user === null || user === void 0 ? void 0 : user._id,
                    paketId: paket_id,
                    endDate,
                    apiKey,
                    resetAt: new Date(new Date().getTime() + 60 * 1000),
                });
                const newSubscription = yield subs.save({ session });
                transactionDetails.push({
                    transactionDetailType: TransactionRelated_enum_1.TransactionDetailType.ADMIN_SUBSCRIBE,
                    paket_id: paket.Paket_id,
                    subscription_id: newSubscription._id,
                    month: month,
                    price: paket.Paket_price,
                    subtotal: paket.Paket_price * month,
                    message: `Admin: ${admin.username}, gave ${user === null || user === void 0 ? void 0 : user.username} a subscription to ${paket.Paket_name} for ${month} month(s) at Rp${paket.Paket_price} per month.`,
                });
            }
            // Insert transaction log
            const transaction = new Transaction_model_1.Transaction({
                header: {
                    transactionHeaderType: TransactionRelated_enum_1.TransactionHeaderType.SUBSCRIBE,
                    date: new Date(),
                    total: transactionDetails.reduce((acc, detail) => acc + detail.subtotal, 0),
                    userId: user === null || user === void 0 ? void 0 : user._id,
                    adminId: admin._id,
                },
                details: transactionDetails,
            });
            yield transaction.save({ session });
            yield session.commitTransaction();
            session.endSession();
            return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.CREATED).json({
                message: "All subscriptions created successfully",
                transaction: transaction.header,
                subscriptions: transactionDetails,
            });
        }
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        // Ensure the error has status and message properties
        const status = error.status || ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR;
        const errorMessage = error.message || "Internal server error";
        return res.status(status).json({ message: errorMessage });
    }
});
exports.addUserPacket = addUserPacket;
const deleteUserPacket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const user = yield User_model_1.User.findOne({ _id: userID });
    if (!user)
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "User not found" });
    const subscription = yield Subscription_model_1.Subscription.findOne({
        userId: userID,
        isActive: true,
    });
    if (!subscription)
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND)
            .json({ msg: "User doesn't have any subscription" });
    yield subscription.updateOne({ isActive: false });
    return res
        .status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS)
        .json({ msg: "Subscription deleted successfully" });
});
exports.deleteUserPacket = deleteUserPacket;
const addExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch data from external API
        // const exercises: any[] = await Apis.API_NINJA_ApiService.get<any[]>("");
        const { offset, limit_per_ten } = req.query;
        // Make API call
        const parsedOffset = Math.floor(Number(offset));
        const parsedLimit = Math.floor(Number(limit_per_ten));
        if (isNaN(parsedOffset) ||
            isNaN(parsedLimit) ||
            parsedLimit < 0 ||
            parsedOffset < 0) {
            return res
                .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
                .json({ msg: "Offset and limit must be non-negative integers." });
        }
        const queryParams = {};
        for (let i = parsedOffset; i < parsedOffset + parsedLimit; i++) {
            queryParams.offset = i * 10;
            let exercises = yield ApiService_1.Apis.API_NINJA_ApiService.get("", {
                params: queryParams,
            });
            for (const exercise of exercises) {
                // Check if the exercise already exists in the database
                const existingExercise = yield Exercise_model_1.Exercise.findOne({
                    name: exercise.name,
                });
                // If the exercise does not exist, insert it into the database
                if (!existingExercise) {
                    const newExercise = new Exercise_model_1.Exercise({
                        name: exercise.name,
                        type: exercise.type,
                        targeted_muscle: exercise.muscle,
                        equipmentRequired: exercise.equipment ? exercise.equipment : "-",
                        description: exercise.instructions,
                    });
                    yield newExercise.save();
                }
            }
        }
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS)
            .json({ msg: "Exercises have been added/updated successfully." });
    }
    catch (error) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
            .json({ msg: "Exercises added/updated failed." });
    }
});
exports.addExercise = addExercise;
const topupFromAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const { saldo } = req.body;
    const admin = req.user;
    if (!saldo) {
        return res
            .status(ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST)
            .json({ msg: "Saldo is required" });
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const schema = Topup_validate_1.topupSchema;
        yield schema.validateAsync({ saldo });
        if (userID && mongoose_1.default.Types.ObjectId.isValid(userID)) {
            const user = yield User_model_1.User.findById(userID).session(session);
            if (!user) {
                throw new Error("User not found");
            }
            if (user.role === UserRelated_enum_1.ROLE.ADMIN) {
                throw new Error("User is admin");
            }
            user.balance += saldo;
            yield user.save({ session });
            const transactionHeader = {
                transactionHeaderType: TransactionRelated_enum_1.TransactionHeaderType.TOPUP,
                date: new Date(),
                total: saldo,
                userId: user._id,
                adminId: admin._id,
            };
            const transactionDetails = [
                {
                    transactionDetailType: TransactionRelated_enum_1.TransactionDetailType.ADMIN_TOPUP,
                    subtotal: saldo,
                    message: `Admin ${admin.fullName} topped up user ${user.fullName} with saldo ${saldo}`,
                },
            ];
            const transaction = {
                header: transactionHeader,
                details: transactionDetails,
            };
            yield Transaction_model_1.Transaction.create([transaction], { session });
            yield session.commitTransaction();
            session.endSession();
            return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({
                msg: "Balance updated successfully",
                username: user.username,
                full_name: user.fullName,
                newBalance: user.balance,
            });
        }
        else if (userID === "ALL") {
            const users = yield User_model_1.User.find({
                role: UserRelated_enum_1.ROLE.USER,
                isEmailVerified: true,
            }).session(session);
            const bulkOps = users.map((user) => ({
                updateOne: {
                    filter: { _id: user._id },
                    update: { $inc: { balance: saldo } },
                },
            }));
            yield User_model_1.User.bulkWrite(bulkOps, { session });
            const transactionHeader = {
                transactionHeaderType: TransactionRelated_enum_1.TransactionHeaderType.TOPUP,
                date: new Date(),
                total: saldo,
                adminId: admin._id,
            };
            const transactionDetails = users.map((user) => ({
                transactionDetailType: TransactionRelated_enum_1.TransactionDetailType.ADMIN_TOPUP,
                subtotal: saldo,
                userId: user._id,
                message: `Admin ${admin.fullName} topped up user ${user.fullName} with saldo ${saldo}`,
            }));
            const transaction = {
                header: transactionHeader,
                details: transactionDetails,
            };
            yield Transaction_model_1.Transaction.create([transaction], { session });
            yield session.commitTransaction();
            session.endSession();
            return res.status(ResponseRelated_enum_1.RESPONSE_STATUS.SUCCESS).json({
                msg: "Balance updated for all users successfully",
            });
        }
        else {
            throw new Error("Invalid userID");
        }
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        const errorMsg = error instanceof Error ? error.message : "Internal Server Error";
        const status = error.message === "User not found"
            ? ResponseRelated_enum_1.RESPONSE_STATUS.NOT_FOUND
            : ResponseRelated_enum_1.RESPONSE_STATUS.BAD_REQUEST;
        return res.status(status).json({ msg: errorMsg });
    }
});
exports.topupFromAdmin = topupFromAdmin;
