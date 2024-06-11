import { Request, Response } from "express";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";
import { IPlans } from "../contracts/dto/PlansRelated.dto";
import { Plans } from "../models/dynamic/Plans.model";
import { PlansStatus } from "../contracts/enum/PlansRelated.enum";
import { FITNESS_GOALS } from "../contracts/enum/FitnessRelated.enum";
import { User } from "../models/dynamic/User.model";
import { Exercise } from "../models/dynamic/Exercise.model";

// Create Exercise Plan
export const createExercisePlan = async (req: Request, res: Response) => {
  const {
    id,
    name,
    description,
    goals,
    durationInWeeks,
    frequencyPerWeek,
    restDaysPerWeek,
    intensity,
    exercises,
    nutritionPlan,
    createdBy,
  } = req.body;

  try {
    const newPlan: IPlans = new Plans({
      id,
      name,
      description,
      goals,
      durationInWeeks,
      frequencyPerWeek,
      restDaysPerWeek,
      intensity,
      exercises,
      nutritionPlan,
      createdBy,
      status: PlansStatus.PENDING,
    });

    const savedPlan = await newPlan.save();

    return res.status(RESPONSE_STATUS.CREATED).json({
      msg: "Exercise plan created successfully",
      plan: savedPlan,
    });
  } catch (error) {
    return res
      .status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error", error });
  }
};
// /users/plan/edit
export const editExercisePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
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
      return res.status(404).json({ msg: "Plan not found" });
    }

    if (name) plan.name = name;
    if (description) plan.description = description;
    if (goals) plan.goals = goals;
    if (durationInWeeks) plan.durationInWeeks = durationInWeeks;
    if (frequencyPerWeek) plan.frequencyPerWeek = frequencyPerWeek;
    if (restDaysPerWeek) plan.restDaysPerWeek = restDaysPerWeek;
    if (intensity) plan.intensity = intensity;
    if (exercises) plan.exercises = exercises;
    if (nutritionPlan) plan.nutritionPlan = nutritionPlan;

    const updatedPlan = await plan.save();

    return res.status(200).json({
      msg: "Exercise plan updated successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};
export const startExercisePlan = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const plan = await Plans.findById(id);

    if (!plan) {
      return res.status(404).json({ msg: "Plan not found" });
    }
    // if there's an exercise
    if (plan.exercises.length < 1) {
      return res.status(404).json({ msg: "No exercise in the plan" });
    }
    if (plan.status == PlansStatus.STARTED) {
      return res.status(404).json({ msg: "Plan already started" });
    }

    plan.status = PlansStatus.STARTED;

    const updatedPlan = await plan.save();

    return res.status(200).json({
      msg: "Exercise plan started successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

export const completeExercisePlan = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const plan = await Plans.findById(id);

    if (!plan) {
      return res.status(404).json({ msg: "Plan not found" });
    }

    plan.status = PlansStatus.COMPLETED;

    const updatedPlan = await plan.save();

    return res.status(200).json({
      msg: "Exercise plan completed successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

export const addWorkoutToExercisePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { exerciseId } = req.body;
  const user = req.body.user;

  const plan = await Plans.findById(id);

  if (!plan) {
    return res.status(404).json({ msg: "Plan not found" });
  }

  const userFromPlan = await User.findById(plan.createdBy);

  if (userFromPlan?._id != user._id) {
    return res.status(404).json({ msg: "Not Your Plan" });
  }

  const exercise = await Exercise.findById(exerciseId);

  if (!exercise) {
    return res.status(404).json({ msg: "Exercise not found" });
  }

  plan.exercises.push(exercise);
  await plan.save();

  return res.status(200).json({ msg: "Exercise added to plan successfully" });
};

export const exercisePlanDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.body.user;
  const plan = await Plans.findById(id);

  if (!plan) {
    return res.status(404).json({ msg: "Plan not found" });
  }
  const userFromPlan = await User.findById(plan.createdBy);
  if (userFromPlan?._id != user._id) {
    return res.status(404).json({ msg: "Not Your Plan" });
  }
  return res.status(200).json({ plan });
};
