import { faker } from "@faker-js/faker";
import {
  generateEmailVerificationToken,
  hashPassword,
} from "../utils/AuthUtils";
import { IUser } from "../contracts/dto/UserRelated.dto";

const userRoles = ["USER", "ADMIN", "SUPER_ADMIN"];

const existingUsernames = new Set<string>();
const existingEmails = new Set<string>();

const generateUniqueUsername = (): string => {
  let username = faker.internet.userName();
  while (existingUsernames.has(username)) {
    username = faker.internet.userName();
  }
  existingUsernames.add(username);
  return username;
};

const generateUniqueEmail = (): string => {
  let email = faker.internet.email();
  while (existingEmails.has(email)) {
    email = faker.internet.email();
  }
  existingEmails.add(email);
  return email;
};

const createSuperAdmin = async (): Promise<IUser> => {
  const username = "super";
  const password = "string";
  const hashedPassword = await hashPassword(password);
  const email = "super@example.com";
  const emailToken = generateEmailVerificationToken(email);

  // Add super admin username and email to sets
  existingUsernames.add(username);
  existingEmails.add(email);

  return {
    fullName: "SUPER ADMIN GENGSSS",
    username: username,
    email: email,
    phone: "203177487338",
    password: hashedPassword,
    profilePicture:
      "src\\storage\\images\\profilePictures\\default_profile.png",
    balance: 0,
    isEmailVerified: true,
    emailVerificationToken: emailToken,
    role: userRoles[2],
  } as IUser;
};

const do_base_password = false;
const generate_password = do_base_password
  ? faker.internet.password()
  : "string";

const createUser = async (isEmailVerified: boolean): Promise<IUser> => {
  const username = generateUniqueUsername();
  const password = generate_password;
  const hashedPassword = await hashPassword(password);
  const email = generateUniqueEmail();
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
    role: userRoles[0],
  } as IUser;
};

const createAdminUser = async (isEmailVerified: boolean): Promise<IUser> => {
  const username = generateUniqueUsername();
  const password = generate_password;
  const hashedPassword = await hashPassword(password);
  const email = generateUniqueEmail();
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
    role: userRoles[1],
  } as IUser;
};

export async function createUsers(amount: number): Promise<{
  verifiedUsers: IUser[];
  unverifiedUsers: IUser[];
  adminUsers: IUser[];
  superAdmin: IUser;
}> {
  let verifiedUsers: IUser[] = [];
  let unverifiedUsers: IUser[] = [];
  let adminUsers: IUser[] = [];
  const superAdmin = await createSuperAdmin();

  for (let i = 0; i < amount; i++) {
    const verifiedUser = await createUser(true);
    const adminUser = await createAdminUser(true);
    const unverifiedUser = await createUser(false);

    verifiedUsers.push(verifiedUser);
    unverifiedUsers.push(unverifiedUser);
    adminUsers.push(adminUser);
  }

  return { verifiedUsers, unverifiedUsers, adminUsers, superAdmin };
}
