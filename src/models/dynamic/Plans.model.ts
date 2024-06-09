import mongoose, { Schema } from "mongoose";
import { IUser } from "../../contracts/dto/UserRelated.dto";
import { FITNESS_GOALS } from "../../contracts/enum/FitnessRelated.enum";
import { IPlans } from "../../contracts/dto/PlansRelated.dto";

const PlansSchema: Schema = new Schema({
});

export const Plans = mongoose.model<IPlans>("Plans",PlansSchema);
