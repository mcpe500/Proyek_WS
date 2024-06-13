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
import Joi from "joi";

export const getExercise = async (req: Request, res: Response) => {
  try {
    const { exercise } = req.query;
    console.log(req.query);
    const response = await Apis.API_NINJA_ApiService.get("", {
      params: { name: exercise },
    });
    console.log(response);
    if ((response as any).length < 1) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({ error: `Exercise Not Found!` });
    }
    else{
      return res.status(RESPONSE_STATUS.SUCCESS).json({ exercise: response });      
    }
    //   .json({ exercise: response.data });
  } catch (error: any) {
    console.error("Request failed:", error);
    return res.status(RESPONSE_STATUS.NOT_FOUND).json({ error: error.message });
  }
};

export const getType = async (req: Request, res: Response) => {
    const validTypes = [
      "cardio",
      "olympic_weightlifting",
      "plyometrics",
      "powerlifting",
      "strength",
      "stretching",
      "strongman"
  ];
  const typeSchema = Joi.string()
    .valid(...validTypes)
    .insensitive();
  try {
    const { error } = typeSchema.validate(req.query.type);
    if (error) {
      const errorMessage = `Type not valid. Valid types are: ${validTypes.join(', ')}`;
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ error: errorMessage });
    }
    const { type } = req.query;
    console.log(req.query);
    const response = await Apis.API_NINJA_ApiService.get("", {
      params: { type: type },
    });
    console.log(response);
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
    const validMuscles = [
      "abdominals",
      "abductors",
      "adductors",
      "biceps",
      "calves",
      "chest",
      "forearms",
      "glutes",
      "hamstrings",
      "lats",
      "lower_back",
      "middle_back",
      "neck",
      "quadriceps",
      "traps",
      "triceps"
  ];
  const muscleSchema = Joi.string()
    .valid(...validMuscles)
    .insensitive();
  try {
    const { error } = muscleSchema.validate(req.query.muscle);
    if (error) {
      const errorMessage = `Muscle not valid. Valid muscles are: ${validMuscles.join(', ')}`;
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ error: errorMessage });
    }
    const { muscle } = req.query;
    console.log(req.query);
    const response = await Apis.API_NINJA_ApiService.get("", {
      params: { muscle: muscle },
    });
    console.log(response);
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
  const validDifficulty = [
      "beginner",
      "intermediate",
      "expert"
  ];
  const difficultySchema = Joi.string()
    .valid(...validDifficulty)
    .insensitive();
  try {
    const { error } = difficultySchema.validate(req.query.difficulty);
    if (error) {
      const errorMessage = `Difficulty not valid. Valid difficulty levels are: ${validDifficulty.join(', ')}`;
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ error: errorMessage });
    }

    const { difficulty } = req.query;
    console.log(req.query);
    const response = await Apis.API_NINJA_ApiService.get("", {
      params: { difficulty: difficulty },
    });
    console.log(response);
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
