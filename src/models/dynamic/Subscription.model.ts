import mongoose, { Schema } from "mongoose";
import { ISubscription } from "../../contracts/dto/SubscriptionRelated.dto";

const SubscriptionSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    packetId: { type: String, required: true },
    apiHit: { type: Number, required: true, default: 0 },
    startDate: { type: Date, default: Date.now() },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
});

export const Subscription = mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
