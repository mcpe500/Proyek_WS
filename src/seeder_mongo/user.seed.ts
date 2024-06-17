import { faker } from "@faker-js/faker";
import {
  generateEmailVerificationToken,
  hashPassword,
} from "../utils/AuthUtils";
import { IUser } from "../contracts/dto/UserRelated.dto";

const userRoles = ["USER", "ADMIN"];

const createSuperAdmin = async (): Promise<IUser> => {
  const username = "Dick";
  const password = "123";
  const hashedPassword = await hashPassword(password);
  const email = faker.internet.email();
  const emailToken = generateEmailVerificationToken(email);

  return {
    fullName: "",
    username: username,
    email: email,
    phone: "",
    password: hashedPassword,
    profilePicture:
      "src\\storage\\images\\profilePictures\\default_profile.png",
    age: faker.number.int({ min: 18, max: 60 }),
    height: faker.number.int({ min: 150, max: 200 }),
    weight: faker.number.int({ min: 50, max: 100 }),
    healthInformation: faker.lorem.sentence(),
    balance: Number(faker.number.bigInt({ min: 0, max: 1000000 })),
    isEmailVerified: isEmailVerified,
    emailVerificationToken: emailToken,
    apiKey: "",
    role: userRoles[0],
  } as IUser;
};

const createUser = async (isEmailVerified: boolean): Promise<IUser> => {
  const username = faker.internet.userName();
  const password = faker.internet.password();
  const hashedPassword = await hashPassword(password);
  const email = faker.internet.email();
  const emailToken = generateEmailVerificationToken(email);

  return {
    fullName: faker.person.fullName(),
    username: username,
    email: email,
    phone: faker.phone.number(),
    password: hashedPassword,
    profilePicture:
      "src\\storage\\images\\profilePictures\\default_profile.png",
    age: faker.number.int({ min: 18, max: 60 }),
    height: faker.number.int({ min: 150, max: 200 }),
    weight: faker.number.int({ min: 50, max: 100 }),
    healthInformation: faker.lorem.sentence(),
    balance: Number(faker.number.bigInt({ min: 0, max: 1000000 })),
    isEmailVerified: isEmailVerified,
    emailVerificationToken: emailToken,
    apiKey: "",
    role: userRoles[0],
  } as IUser;
};

export async function createUsers(amount: number): Promise<{
  verifiedUsers: IUser[];
  unverifiedUsers: IUser[];
}> {
  let verifiedUsers = [];
  let unverifiedUsers = [];
  for (let i = 0; i < amount; i++) {
    const verifiedUser = await createUser(true);
    const unverifiedUser = await createUser(false);

    verifiedUsers.push(verifiedUser);
    unverifiedUsers.push(unverifiedUser);
  }

  return { verifiedUsers, unverifiedUsers };
}
