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
import { FITNESS_GOALS } from "../contracts/enum/FitnessRelated.enum";
import { Exercise } from "../models/dynamic/Exercise.model";

export const getExercise = async (req: Request, res: Response) => {
  try {
    // Extract body parameters
    const { exercise, type, muscle, difficulty } = req.query;

    // Define valid types and muscles for validation
    const validTypes = [
      "cardio",
      "olympic_weightlifting",
      "plyometrics",
      "powerlifting",
      "strength",
      "stretching",
      "strongman",
    ];

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
      "triceps",
      "shoulders"
    ];

    const validDifficulty = ["beginner", "intermediate", "expert"];

    // Define schemas for validation
    const typeSchema = Joi.string()
      .valid(...validTypes)
      .insensitive();
    const muscleSchema = Joi.string()
      .valid(...validMuscles)
      .insensitive();
    const difficultySchema = Joi.string()
      .valid(...validDifficulty)
      .insensitive();

    // Validate type, muscle, and difficulty
    if (type) {
      const { error } = typeSchema.validate(type);
      if (error) {
        const errorMessage = `Type not valid. Valid types are: ${validTypes.join(
          ", "
        )}`;
        return res
          .status(RESPONSE_STATUS.BAD_REQUEST)
          .json({ error: errorMessage });
      }
    }

    if (muscle) {
      const { error } = muscleSchema.validate(muscle);
      if (error) {
        const errorMessage = `Muscle not valid. Valid muscles are: ${validMuscles.join(
          ", "
        )}`;
        return res
          .status(RESPONSE_STATUS.BAD_REQUEST)
          .json({ error: errorMessage });
      }
    }

    if (difficulty) {
      const { error } = difficultySchema.validate(difficulty);
      if (error) {
        const errorMessage = `Difficulty not valid. Valid difficulty levels are: ${validDifficulty.join(
          ", "
        )}`;
        return res
          .status(RESPONSE_STATUS.BAD_REQUEST)
          .json({ error: errorMessage });
      }
    }

    let exercises;
    let filter: any = {};
    if (!exercise && !type && !muscle && !difficulty) {
      exercises = await Exercise.aggregate([{ $sample: { size: 20 } }]);
      console.log(exercises)
  } else {
      if (exercise) {filter.name = { $regex: exercise, $options: 'i' }}
      if (type) {filter.type = type}
      if (muscle) {filter.muscle = muscle}
      if (difficulty) {filter.difficulty = difficulty}
      exercises = await Exercise.find(filter);
  }

    // Check for empty response
    if ((exercises as any).length < 1) {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ error: `Exercise Not Found!` });
    }

    // Return successful response
    return res.status(RESPONSE_STATUS.SUCCESS).json({ exercise: exercises });
  } catch (error: any) {
    console.error("Request failed:", error);
    return res.status(RESPONSE_STATUS.NOT_FOUND).json({ error: error.message });
  }
};

export const getAllGoals = async (req: Request, res: Response) => {
  try {
    const goalsBrief = Object.values(FITNESS_GOALS).map((goal) => ({
      title: goal.title,
      description: goal.description,
    }));

    return res.status(RESPONSE_STATUS.SUCCESS).json({ Goal_list: goalsBrief });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const getGoalByTitle = async (req: Request, res: Response) => {
  try {
    const goalTitle = req.params.title.toLowerCase();
    const goal = Object.values(FITNESS_GOALS).find(
      (goal) => goal.title.toLowerCase() === goalTitle
    );

    if (goal) {
      return res.status(RESPONSE_STATUS.SUCCESS).json({ Goal: goal });
    } else {
      res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Goal not found" });
    }
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
