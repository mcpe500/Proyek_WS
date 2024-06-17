import mongoose, { Schema } from "mongoose";
import { ITransaction } from "../../contracts/dto/TransactionRelated.dto";
import {
  TransactionDetailType,
  TransactionHeaderType,
} from "../../contracts/enum/TransactionRelated.enum";

const TransactionSchema: Schema = new Schema({
  header: {
    transactionHeaderType: {
      type: String,
      enum: Object.values(TransactionHeaderType),
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  details: [
    {
      transactionDetailType: {
        type: String,
        enum: Object.values(TransactionDetailType),
        required: true,
      },
      paket_id: String,
      subscription_id: String,
      month: Number,
      price: Number,
      subtotal: Number,
      message: String,
    },
  ],
});

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
