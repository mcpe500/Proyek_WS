import { Request, Response } from "express";
import { RESPONSE_STATUS } from "../contracts/enum/ResponseRelated.enum";
import { IPlans } from "../contracts/dto/PlansRelated.dto";
import { Plans } from "../models/dynamic/Plans.model";
import { PlansStatus } from "../contracts/enum/PlansRelated.enum";
import { FITNESS_GOALS } from "../contracts/enum/FitnessRelated.enum";

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

module.exports = {
  createExercisePlan,
  startExercisePlan,
  completeExercisePlan,
};
