import { Document, Types } from "mongoose";

export interface ISubscription extends Document {
  userId: Types.ObjectId;
  paketId: string;
  apiHit: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  apiKey: string;
  resetAt: Date;
}
