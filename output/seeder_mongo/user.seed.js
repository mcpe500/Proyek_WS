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
exports.createUsers = void 0;
const faker_1 = require("@faker-js/faker");
const AuthUtils_1 = require("../utils/AuthUtils");
const userRoles = ["USER", "ADMIN"];
// const createSuperAdmin = async (): Promise<IUser> => {
//   const username = "Dick";
//   const password = "123";
//   const hashedPassword = await hashPassword(password);
//   const email = faker.internet.email();
//   const emailToken = generateEmailVerificationToken(email);
//   return {
//     fullName: "",
//     username: username,
//     email: email,
//     phone: "",
//     password: hashedPassword,
//     profilePicture:
//       "src\\storage\\images\\profilePictures\\default_profile.png",
//     age: faker.number.int({ min: 18, max: 60 }),
//     height: faker.number.int({ min: 150, max: 200 }),
//     weight: faker.number.int({ min: 50, max: 100 }),
//     healthInformation: faker.lorem.sentence(),
//     balance: Number(faker.number.bigInt({ min: 0, max: 1000000 })),
//     isEmailVerified: isEmailVerified,
//     emailVerificationToken: emailToken,
//     apiKey: "",
//     role: userRoles[0],
//   } as IUser;
// };
const createUser = (isEmailVerified) => __awaiter(void 0, void 0, void 0, function* () {
    const username = faker_1.faker.internet.userName();
    const password = faker_1.faker.internet.password();
    const hashedPassword = yield (0, AuthUtils_1.hashPassword)(password);
    const email = faker_1.faker.internet.email();
    const emailToken = (0, AuthUtils_1.generateEmailVerificationToken)(email);
    return {
        fullName: faker_1.faker.person.fullName(),
        username: username,
        email: email,
        phone: faker_1.faker.phone.number(),
        password: hashedPassword,
        profilePicture: "src\\storage\\images\\profilePictures\\default_profile.png",
        age: faker_1.faker.number.int({ min: 18, max: 60 }),
        height: faker_1.faker.number.int({ min: 150, max: 200 }),
        weight: faker_1.faker.number.int({ min: 50, max: 100 }),
        healthInformation: faker_1.faker.lorem.sentence(),
        balance: Number(faker_1.faker.number.bigInt({ min: 0, max: 1000000 })),
        isEmailVerified: isEmailVerified,
        emailVerificationToken: emailToken,
        role: userRoles[0],
    };
});
const createAdminUser = (isEmailVerified) => __awaiter(void 0, void 0, void 0, function* () {
    const username = faker_1.faker.internet.userName();
    const password = faker_1.faker.internet.password();
    const hashedPassword = yield (0, AuthUtils_1.hashPassword)(password);
    const email = faker_1.faker.internet.email();
    const emailToken = (0, AuthUtils_1.generateEmailVerificationToken)(email);
    return {
        fullName: faker_1.faker.person.fullName(),
        username: username,
        email: email,
        phone: faker_1.faker.phone.number(),
        password: hashedPassword,
        profilePicture: "src\\storage\\images\\profilePictures\\default_profile.png",
        age: faker_1.faker.number.int({ min: 18, max: 60 }),
        height: faker_1.faker.number.int({ min: 150, max: 200 }),
        weight: faker_1.faker.number.int({ min: 50, max: 100 }),
        healthInformation: faker_1.faker.lorem.sentence(),
        balance: Number(faker_1.faker.number.bigInt({ min: 0, max: 1000000 })),
        isEmailVerified: isEmailVerified,
        emailVerificationToken: emailToken,
        role: userRoles[1],
    };
});
function createUsers(amount) {
    return __awaiter(this, void 0, void 0, function* () {
        let verifiedUsers = [];
        let unverifiedUsers = [];
        let adminUsers = [];
        for (let i = 0; i < amount; i++) {
            const verifiedUser = yield createUser(true);
            const adminUser = yield createAdminUser(true);
            const unverifiedUser = yield createUser(false);
            verifiedUsers.push(verifiedUser);
            unverifiedUsers.push(unverifiedUser);
            adminUsers.push(adminUser);
        }
        return { verifiedUsers, unverifiedUsers, adminUsers };
    });
}
exports.createUsers = createUsers;
