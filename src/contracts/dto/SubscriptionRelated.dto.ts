import { Document } from "mongoose";

export interface ISubscription extends Document {
    userId: String,
    paketId: String,
    apiHit: Number,
    startDate: Date,
    endDate: Date,
    isActive: Boolean,
}
