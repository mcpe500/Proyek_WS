import {
  ITransaction,
  ITransactionSubscriptionDetail,
} from "./../contracts/dto/TransactionRelated.dto";
import { IPaket } from "../contracts/dto/Paket.dto";
import { ISubscription } from "../contracts/dto/SubscriptionRelated.dto";
import { ITransationHeaderAdmin } from "../contracts/dto/TransactionRelated.dto";
import { IUser } from "../contracts/dto/UserRelated.dto";
import {
  TransactionDetailType,
  TransactionHeaderType,
} from "../contracts/enum/TransactionRelated.enum";
import Paket from "../models/static/Paket.model";

let pakets: IPaket[] = [];

function monthsBetweenDates(dateFrom: Date, dateTo: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  const diffDays = Math.round(
    Math.abs((dateTo.getTime() - dateFrom.getTime()) / oneDay)
  );
  return Math.round(diffDays / 30);
}

export const createTransactions = async (
  verifiedUsers: IUser[],
  subscriptions: ISubscription[],
  selectedAdmin: IUser
): Promise<ITransaction[]> => {
  pakets = await Paket.findAll({});
  const transactionAbleSubscriptions = subscriptions.filter(
    (s) => s.paketId != "PAK001"
  );

  const transactions: ITransaction[] = [];

  for (let i = 0; i < transactionAbleSubscriptions.length; i++) {
    const currentSubscription = transactionAbleSubscriptions[i];
    const currentPaket = pakets.find(
      (s) => s.Paket_id == currentSubscription.paketId
    );

    const transactionHeader: ITransationHeaderAdmin = {
      transactionHeaderType: TransactionHeaderType.SUBSCRIBE,
      date: new Date(),
      total: Number(currentPaket?.Paket_price),
      adminId: selectedAdmin._id,
      userId: currentSubscription.userId,
    };

    const transactionDetails: ITransactionSubscriptionDetail[] = [
      {
        transactionDetailType: TransactionDetailType.ADMIN_SUBSCRIBE,
        paket_id: String(currentPaket?.Paket_id),
        subscription_id: String(currentSubscription._id),
        month: monthsBetweenDates(
          currentSubscription.startDate,
          currentSubscription.endDate
        ),
        price: Number(currentPaket?.Paket_price),
        subtotal: Number(currentPaket?.Paket_price),
        message: `Admin: ${
          selectedAdmin.username
        } gave user a subscription to ${
          currentPaket?.Paket_name
        } for ${monthsBetweenDates(
          currentSubscription.startDate,
          currentSubscription.endDate
        )} month(s) at Rp${currentPaket?.Paket_price} per month.`,
      },
    ];

    transactions.push({
      header: transactionHeader,
      details: transactionDetails,
    });
  }

  return transactions;
};
