import { Types } from "mongoose";
import {
  TransactionDetailType,
  TransactionHeaderType,
} from "../enum/TransactionRelated.enum";

export interface ITransationHeaderUser {
  transactionHeaderType: TransactionHeaderType;
  date: Date;
  total: number;
  userId: Types.ObjectId;
}
export interface ITransationHeaderAdmin {
  transactionHeaderType: TransactionHeaderType;
  date: Date;
  total: number;
  userId: Types.ObjectId | null | undefined;
  adminId: Types.ObjectId;
}

export interface ITransactionSubscriptionDetail {
  transactionDetailType: TransactionDetailType;
  paket_id: string;
  subscription_id: string;
  month: number;
  price: number;
  subtotal: number;
  message: string;
}
export interface ITransactionTopUpDetail {
  transactionDetailType: TransactionDetailType;
  subtotal: number;
  message: string;
  userId?: Types.ObjectId;
}

export interface ITransaction {
  header: ITransationHeaderUser | ITransationHeaderAdmin;
  details: ITransactionSubscriptionDetail[] | ITransactionTopUpDetail[];
}
