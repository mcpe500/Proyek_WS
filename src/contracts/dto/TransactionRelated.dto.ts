import { Types } from "mongoose";
import {
  TransactionDetailType,
  TransactionHeaderType,
} from "../enum/TransactionRelated.enum";

export interface ITransationHeader {
  transactionHeaderType: TransactionHeaderType;
  date: Date;
  total: number;
  userId: Types.ObjectId;
  isAdmin: boolean;
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
}
export interface ITransaction {
  header: ITransationHeader;
  details: ITransactionSubscriptionDetail[] | ITransactionTopUpDetail[];
}
