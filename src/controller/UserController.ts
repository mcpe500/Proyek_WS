// import { bcrypt } from 'bcrypt';
import { Request, Response } from "express";
import {
    createAccessToken,
    createRefreshToken,
    generateEmailVerificationToken,
    hashPassword,
    sendVerificationEmail,
    verifyEmailVerificationToken,
    verifyPassword,
    verifyRefreshToken,
} from "../utils/AuthUtils";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";
import { User } from "../models/dynamic/User.model";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import crypto from "crypto";

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
//   fitnessGoals: {
//     type: String,
//     required: true,
//     enum: Object.values(FITNESS_GOALS),
//   },
//   healthInformation: { type: String, required: true },
//   refreshToken: { type: String },
//   isEmailVerified: { type: Boolean, default: false },
//   emailVerificationToken: { type: String },
// });

export const registerUser = async (req: Request, res: Response) => {
    const {
        username,
        email,
        password,
        fullName,
        phone,
        // age,
        // gender,
        // height,
        // weight,
        // fitnessGoals,
        // healthInformation,
    } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] }); //
        if (existingUser) {
            return res
                .status(RESPONSE_STATUS.BAD_REQUEST)
                .json({ msg: "Username or email already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const emailToken = generateEmailVerificationToken(email);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            fullName,
            phone,
            //   age,
            //   gender,
            //   height,
            //   weight,
            //   fitnessGoals,
            //   healthInformation,
            isEmailVerified: false,
            emailVerificationToken: emailToken,
        });
        const savedUser = await newUser.save();
        const respone = {
            username: savedUser.username,
            email: savedUser.email,
            fullName: savedUser.email,
            phone: savedUser.phone,
            _id: savedUser._id
        };
        await sendVerificationEmail(email, emailToken, username);
        return res.status(RESPONSE_STATUS.CREATED).json({
            msg: "Register Successful, please verify your email!",
            user: respone,
        });
    } catch (error) {
        return res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, email, password, rememberMe } = req.body;
    console.log(req.body);
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        return res
            .status(RESPONSE_STATUS.BAD_REQUEST)
            .json({ msg: "Invalid credentials" });
    }
    if (!user.isEmailVerified) {
        return res
            .status(RESPONSE_STATUS.BAD_REQUEST)
            .send({ message: "Please verify your email" });
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
        return res
            .status(RESPONSE_STATUS.BAD_REQUEST)
            .json({ msg: "Invalid credentials" });
    }
    const dataToToken = {
        username: username,
        email: email,
    };
    const accessToken = createAccessToken(dataToToken, rememberMe);
    const refreshToken = createRefreshToken(dataToToken, rememberMe);

    await user.updateOne({
        refreshToken: refreshToken,
        accessToken: accessToken,
    });

    res.cookie("refresh_token", refreshToken, { httpOnly: true });

    return res.status(RESPONSE_STATUS.SUCCESS).json({
        msg: "Logged in successfully",
        token: accessToken,
    });
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(RESPONSE_STATUS.BAD_REQUEST)
            .json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
        return res
            .status(RESPONSE_STATUS.NOT_FOUND)
            .json({ message: "User not found" });
    }

    return res.status(RESPONSE_STATUS.SUCCESS).json({ user: user });
};

export const getAllUser = async (req: Request, res: Response) => {
    const user = await User.find();

    return res.status(RESPONSE_STATUS.SUCCESS).json({ user: user });
};

export const getDashboard = async (req: Request, res: Response) => {
    const { username, email } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });

    return res.status(RESPONSE_STATUS.SUCCESS).json({ user: user });
};

export const editProfile = async (req: Request, res: Response) => {
    const { old_password, new_password, confirm_password, fullName, phone, age, gender, height, weight, fitnessGoals, healthInformation, username, email } = req.body;
    let user = await User.findOne({ $or: [{ username }, { email }] });
    
    if (!user) {
        return res
            .status(RESPONSE_STATUS.NOT_FOUND)
            .json({ message: "User not found" });
    }
    
    if (old_password != "") {
        const isPasswordValid = await verifyPassword(old_password, user.password);
        if (!isPasswordValid) {
            return res
                .status(RESPONSE_STATUS.BAD_REQUEST)
                .json({ msg: "old_password is incorrect" });
        }

        if (new_password == "") {
            return res
                .status(RESPONSE_STATUS.BAD_REQUEST)
                .json({ msg: "new_password must not be empty" });
        }
        if (new_password != confirm_password) {
            return res
                .status(RESPONSE_STATUS.BAD_REQUEST)
                .json({ msg: "confirm_password does not match" });
        }
        const hashedPassword = await hashPassword(new_password);
        
        // Update password
        user.password = hashedPassword;
    }

    // Update other fields if they are not empty
    if (fullName != "") user.fullName = fullName;
    if (phone != "") user.phone = phone;
    if (age != "") user.age = age;
    if (gender != "") user.gender = gender;
    if (height != "") user.height = height;
    if (weight != "") user.weight = weight;
    if (fitnessGoals != "") user.fitnessGoals = fitnessGoals;
    if (healthInformation != "") user.healthInformation = healthInformation;

    // Save the updated user
    await user.save();

    return res.status(RESPONSE_STATUS.SUCCESS).json({ user: user });
};

export const newRefreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    try {
        const decoded = verifyRefreshToken(refreshToken);
        const user = await User.findOne({ refreshToken: refreshToken });

        if (!user) {
            return res
                .status(RESPONSE_STATUS.NOT_FOUND)
                .json({ message: "User not found" });
        }

        const dataToToken = {
            username: user.username,
            email: user.email,
        };

        const newRefreshToken = createRefreshToken(dataToToken, false);
        await user.updateOne({ refreshToken: newRefreshToken });
        res.cookie("refresh_token", refreshToken, { httpOnly: true });
    } catch (err) {
        return res
            .status(RESPONSE_STATUS.FORBIDDEN)
            .json({ message: "Invalid refresh token" });
    }
};

export const generateNewAccessToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    try {
        const decoded = verifyRefreshToken(refreshToken);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res
                .status(RESPONSE_STATUS.NOT_FOUND)
                .json({ message: "User not found" });
        }

        const dataToToken = {
            username: user.username,
            email: user.email,
        };
        const accessToken = createAccessToken(dataToToken, false);
        await user.updateOne({ accessToken: accessToken });
        return res.status(RESPONSE_STATUS.SUCCESS).json({ accessToken });
    } catch (err) {
        return res
            .status(RESPONSE_STATUS.FORBIDDEN)
            .json({ message: "Invalid refresh token" });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    const { emailVerificationToken } = req.params;
    try {
        const decoded: JwtPayload | null = verifyEmailVerificationToken(
            emailVerificationToken
        ) as JwtPayload;

        const user = await User.findOne({
            emailVerificationToken: emailVerificationToken,
        });

        if (user?.email != decoded?.email) {
            return res
                .status(RESPONSE_STATUS.FORBIDDEN)
                .json({ message: "Invalid email verification token" });
        }

        if (!user) {
            return res
                .status(RESPONSE_STATUS.NOT_FOUND)
                .json({ message: "User not found" });
        }
        const apiKey = crypto.randomBytes(32).toString('hex');
        await user.updateOne({
            isEmailVerified: true,
            emailVerificationToken: null,
            apiKey
        });

        return res
            .status(RESPONSE_STATUS.SUCCESS)
            .send({ message: "Email verified", apiKey: apiKey});
    } catch (err) {
        return res.status(RESPONSE_STATUS.FORBIDDEN).json({
            message:
                "Invalid email verification token or your email verification token has expired",
        });
    }
};

export const getApiKey = async (req: Request, res: Response) => {
    const { username, email } = req.body;

    try {
        const user : any = await User.findOne({ $or: [{ username }, { email }] });

        // Jika pengguna ditemukan, kirimkan API key
        if (user) {
            if (user.apiKey) {
                return res.status(RESPONSE_STATUS.SUCCESS).json({ apiKey: user.apiKey });
            } else {
                return res.status(RESPONSE_STATUS.NOT_FOUND).json({ msg: 'API key not found for this user' });
            }
        } else {
            return res.status(RESPONSE_STATUS.NOT_FOUND).json({ msg: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error' });
    }
};

export const resetApiKey = async (req: Request, res: Response) => {
    const { username, email } = req.body;

    try {
        const user : any = await User.findOne({ $or: [{ username }, { email }] });

        // Jika pengguna ditemukan, kirimkan API key
        if (user) {
            const apiKey = crypto.randomBytes(32).toString('hex');
            await user.updateOne({apiKey});
            return res.status(RESPONSE_STATUS.SUCCESS).json({ apiKey: user.apiKey });
        } else {
            return res.status(RESPONSE_STATUS.NOT_FOUND).json({ msg: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error' });
    }
};

export const subscribePacket = async (req: Request, res: Response) => {
    const { packetId, username, email } = req.body;
    // check packet valid
    // check balance
    // update balancea
    // insert subscription
};

// Mau 1. paket jadi …k per bulan unlimited tembak,
// [Free] rate limit 2 per 5 menit?
// [Paket 1] rate limit 20 per 10 detik 50k?
// [Paket 2] rate limit 50 per 10 detik 100k?
// [Paket 3] rate limit 150 per 10 detik 250k?
// [Enterprise] rate limit 1000 per detik 2000k?
