import { Document } from "mongoose";

export interface ISubscription extends Document {
    userId: String,
    packetId: String,
    apiHit: Number,
    startDate: Date,
    endDate: Date,
    isActive: Boolean,
}
