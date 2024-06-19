import { Request, Response } from "express";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";
import { IPlans } from "../contracts/dto/PlansRelated.dto";
import { Plans } from "../models/dynamic/Plans.model";
import { PlansStatus } from "../contracts/enum/PlansRelated.enum";
import { FITNESS_GOALS } from "../contracts/enum/FitnessRelated.enum";
import { User } from "../models/dynamic/User.model";
import { Exercise, ExercisePlan } from "../models/dynamic/Exercise.model";
import mongoose, { set } from "mongoose";

// Create Exercise Plan
export const createExercisePlan = async (req: Request, res: Response) => {
  const {
    name,
    description,
    goals,
    durationInWeeks,
    frequencyPerWeek,
    restDaysPerWeek,
    intensity,
    exercises,
    nutritionPlan,
  } = req.body;

  try {
    const newPlan: IPlans = new Plans({
      name,
      description,
      goals,
      durationInWeeks,
      frequencyPerWeek,
      restDaysPerWeek,
      intensity,
      exercises,
      nutritionPlan,
      createdBy: (req as any).user.username,
      status: PlansStatus.PENDING,
    });
    const savedPlan = await newPlan.save();

    return res.status(RESPONSE_STATUS.CREATED).json({
      message: "Exercise plan created successfully",
      plan: savedPlan,
    });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error });
  }
};
// /users/plan/edit
export const editExercisePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const {
    name,
    description,
    goals,
    durationInWeeks,
    frequencyPerWeek,
    restDaysPerWeek,
    intensity,
    exercises,
    nutritionPlan,
  } = req.body;

  try {
    const plan = await Plans.findById(id);

    if (!plan) {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ message: "Plan not found" });
    }
    if (plan.createdBy != user.username) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Not Your Plan" });
    }

    if (plan.status != PlansStatus.PENDING) {
      return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "Plan already started/deleted/cancelled" });
    }

    if (name) plan.name = name;
    if (description) plan.description = description;
    if (goals) plan.goals = goals;
    if (durationInWeeks) plan.durationInWeeks = durationInWeeks;
    if (frequencyPerWeek) plan.frequencyPerWeek = frequencyPerWeek;
    if (restDaysPerWeek) plan.restDaysPerWeek = restDaysPerWeek;
    if (intensity) plan.intensity = intensity;
    //if (exercises) plan.exercises = exercises;
    //if (nutritionPlan) plan.nutritionPlan = nutritionPlan;

    const updatedPlan = await plan.save();

    return res.status(RESPONSE_STATUS.SUCCESS).json({
      message: "Exercise plan updated successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error });
  }
};

export const startExercisePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  try {
    const plan = await Plans.findById(id);

    if (!plan) {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ message: "Plan not found" });
    }
    if (plan.createdBy != user.username) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Not Your Plan" });
    }
    // if there's an exercise
    if (plan.exercises.length < 1) {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ message: "No exercise in the plan" });
    }
    if (plan.status != PlansStatus.PENDING) {
      return res
        .status(RESPONSE_STATUS.BAD_REQUEST)
        .json({ message: "Plan already started/deleted/cancelled" });
    }

    plan.status = PlansStatus.STARTED;

    const updatedPlan = await plan.save();

    return res.status(RESPONSE_STATUS.SUCCESS).json({
      message: "Exercise plan started successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error });
  }
};

export const completeExercisePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  try {
    const plan = await Plans.findById(id);

    if (!plan) {
      return res
        .status(RESPONSE_STATUS.NOT_FOUND)
        .json({ message: "Plan not found" });
    }
    if (plan.createdBy != user.username) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Not Your Plan" });
    }
    if (plan.status != PlansStatus.STARTED) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Plan status is pending/cancelled/completed" });
    }
    plan.status = PlansStatus.COMPLETED;

    const updatedPlan = await plan.save();

    return res.status(RESPONSE_STATUS.SUCCESS).json({
      message: "Exercise plan completed successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error });
  }
};

export const addWorkoutToExercisePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { exerciseId, sets, repetitions, restBetweenSetsInSeconds } = req.body;
  const user = (req as any).user;

  const plan = await Plans.findById(id);

  if (plan?.status != "PENDING") {
    return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Plan has been started/completed/canceled" });
  }

  if (isNaN(sets) || isNaN(repetitions) || isNaN(restBetweenSetsInSeconds)) {
    return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "sets, repititions, and restBetweenSetsInSeconds must be a number" });
  }

  if (!plan) {
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ message: "Plan not found" });
  }

  if (plan.createdBy != user.username) {
    return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Not Your Plan" });
  }
  let exercise;
  try {
      exercise = await Exercise.findById(exerciseId);
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ message: "Exercise not found" });
  }

  const workout = {
    name: exercise?.name,
    description: exercise?.instructions,
    sets: sets,
    repetitions: repetitions,
    restBetweenSetsInSeconds: restBetweenSetsInSeconds,
    equipmentRequired: exercise?.equipmentRequired
  };
  plan.exercises.push(workout as any);
  await plan.save();

  return res
    .status(RESPONSE_STATUS.SUCCESS)
    .json({ message: "Exercise added to plan successfully" });
};

export const exercisePlanDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const plan = await Plans.findById(id);

  if (!plan) {
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ message: "Plan not found" });
  }
  const userFromPlan = await User.findById(plan.createdBy);
  if (userFromPlan?._id != user._id) {
    return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Not Your Plan" });
  }
  return res.status(RESPONSE_STATUS.NOT_FOUND).json({ plan });
};

export const getAllExercisePlanByUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const plans = await Plans.find({
    createdBy: user.username,
  }).select("_id name createdDate status");

  try {
    return res.status(RESPONSE_STATUS.SUCCESS).json({ plans: plans });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const getExercisePlanDetailByUser = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const user = (req as any).user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "Invalid ID" });
  }
  const plan = await Plans.findById(id);

  if (!plan) {
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ message: "Plan not found" });
  }

  if (plan.createdBy != user.username) {
    return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Not Your Plan" });
  }

  try {
    return res.status(RESPONSE_STATUS.SUCCESS).json({ plan_detail: plan });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const pictureExercisePlanByUser = async (
  req: Request,
  res: Response
) => {};

export const trackerExercisePlanByUser = async (
  req: Request,
  res: Response
) => {};

export const cancelExercisePlanByUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "Invalid ID" });
  }
  const plan = await Plans.findById(id);

  if (!plan) {
    return res
      .status(RESPONSE_STATUS.NOT_FOUND)
      .json({ message: "Plan not found" });
  }

  if (plan.createdBy != user.username) {
    return res.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Not Your Plan" });
  }

  if (plan.status !== "PENDING" && plan.status !== "STARTED") {
    return res
      .status(RESPONSE_STATUS.BAD_REQUEST)
      .json({ message: "Plan status is already completed or cancelled" });
  }

  try {
    plan.status = PlansStatus.CANCELLED;
    await plan.save();

    return res
      .status(RESPONSE_STATUS.SUCCESS)
      .json({ message: "Plan has been cancelled" });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
