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
import axios from "axios";
import { ENV } from "../config/environment";
import { Apis } from "../services/ApiService";

export const getExercise = async (req: Request, res: Response) => {
  try {
    const { exercise } = req.query;
    const response = await Apis.API_NINJA_ApiService.query(
      "",
      {
        name: exercise,
      },
      { "X-Api-Key": ENV.API_NINJAS_API_KEY }
    );
    // const response = await axios.get(
    //   "https://api.api-ninjas.com/v1/exercises?name=" + exercise,
    //   {
    //     headers: {
    //       "X-Api-Key": ENV.API_NINJAS_API_KEY,
    //     },
    //   }
    // );

    return res.status(RESPONSE_STATUS.SUCCESS).json({ exercise: response });
    //   .json({ exercise: response.data });
  } catch (error: any) {
    console.error("Request failed:", error);
    return res.status(RESPONSE_STATUS.NOT_FOUND).json({ error: error.message });
  }
};

export const getType = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    const response = await Apis.API_NINJA_ApiService.query(
      "",
      {
        type: type,
      },
      { "X-Api-Key": ENV.API_NINJAS_API_KEY }
    );
    // const response = await axios.get(
    //   "https://api.api-ninjas.com/v1/exercises?type=" + type,
    //   {
    //     headers: {
    //       "X-Api-Key": ENV.API_NINJAS_API_KEY,
    //     },
    //   }
    // );

    return res.status(RESPONSE_STATUS.SUCCESS).json({ exercise: response });
    //   .json({ exercise: response.data });
  } catch (error: any) {
    console.error("Request failed:", error);
    return res.status(RESPONSE_STATUS.NOT_FOUND).json({ error: error.message });
  }
};

export const getMuscle = async (req: Request, res: Response) => {
  try {
    const { muscle } = req.query;
    const response = await Apis.API_NINJA_ApiService.query(
      "",
      {
        muscle: muscle,
      },
      { "X-Api-Key": ENV.API_NINJAS_API_KEY }
    );
    // const response = await axios.get(
    //   "https://api.api-ninjas.com/v1/exercises?muscle=" + muscle,
    //   {
    //     headers: {
    //       "X-Api-Key": ENV.API_NINJAS_API_KEY,
    //     },
    //   }
    // );

    return res.status(RESPONSE_STATUS.SUCCESS).json({ exercise: response });
    //   .json({ exercise: response.data });
  } catch (error: any) {
    console.error("Request failed:", error);
    return res.status(RESPONSE_STATUS.NOT_FOUND).json({ error: error.message });
  }
};

export const getDifficulty = async (req: Request, res: Response) => {
  try {
    const { difficulty } = req.query;
    const response = await Apis.API_NINJA_ApiService.query(
      "",
      {
        difficulty: difficulty,
      },
      { "X-Api-Key": ENV.API_NINJAS_API_KEY }
    );
    // const response = await axios.get(
    //   "https://api.api-ninjas.com/v1/exercises?difficulty=" + difficulty,
    //   {
    //     headers: {
    //       "X-Api-Key": ENV.API_NINJAS_API_KEY,
    //     },
    //   }
    // );

    return res.status(RESPONSE_STATUS.SUCCESS).json({ exercise: response });
    // return res.status(RESPONSE_STATUS.SUCCESS).json({ exercise: response.data });
  } catch (error: any) {
    console.error("Request failed:", error);
    return res.status(RESPONSE_STATUS.NOT_FOUND).json({ error: error.message });
  }
};
