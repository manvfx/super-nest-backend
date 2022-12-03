import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { Seller } from 'src/seller/schemas/seller.schema';
import { Subscription } from 'src/subscription/schemas/subscription.schema';
import * as ZarinPalCheckout from 'zarinpal-checkout';
import {
  PaymentRequestInput,
  PaymentVerificationInput,
  ZarinPalInstance,
} from 'zarinpal-checkout';

const merchantID = '3981d486-5dcf-429f-9654-9016684a10a2';

@Injectable()
export class PaymentService {
  private readonly ZARRINPAL: ZarinPalInstance;

  constructor(
    @InjectModel(Transaction.name)
    private TransactionModel: Model<Transaction>,
    @InjectModel(Seller.name)
    private SellerModel: Model<Seller>,
    @InjectModel(Subscription.name)
    private SubscriptionModel: Model<Subscription>,
  ) {
    this.ZARRINPAL = ZarinPalCheckout.create(merchantID, true);
  }

  async paymentRequest(
    amount: number,
    callbackUrl: string,
    description: string,
    seller: string,
    subscription: string,
  ) {
    const paymentRequestInput: PaymentRequestInput = {
      Amount: amount,
      CallbackURL: callbackUrl,
      Description: description,
    };
    const paymentRequestOutput = await this.ZARRINPAL.PaymentRequest(
      paymentRequestInput,
    );

    if (paymentRequestOutput.status != 100) {
      throw new ServiceUnavailableException({
        description: 'Payment service is not available. Please try later.',
      });
    }

    const authority = paymentRequestOutput.authority;
    const transactionRes = await new this.TransactionModel({
      transactionNumber: authority,
      transactionStatusCode: paymentRequestOutput.status,
      amount: amount,
      description: description,
      seller: seller,
      subscription: subscription,
    }).save();

    return {
      url: paymentRequestOutput.url,
      data: transactionRes,
    };
  }

  async paymentVerify(authority: string) {
    const transaction = await this.TransactionModel.findOne({ authority });
    if (!transaction) {
      throw new NotFoundException(
        'Payment with this authority does not exist.',
      );
    }

    const paymentVerificationInput: PaymentVerificationInput = {
      Amount: transaction.amount,
      Authority: transaction.transactionNumber,
    };
    const paymentVerificationOutput = await this.ZARRINPAL.PaymentVerification(
      paymentVerificationInput,
    );

    let message;

    transaction.status = paymentVerificationOutput.status;

    if (transaction.status == 100) {
      const sellerId = transaction.seller;
      const subscriptionId = await this.SubscriptionModel.findOne({
        seller: sellerId,
      });
      await this.SellerModel.updateOne(
        { _id: sellerId },
        {
          $inc: { vipAt: subscriptionId.endDate, vipType: subscriptionId.type },
        },
      ).exec();
    }

    if (transaction.status == 100 || transaction.status == 101) {
      message = 'Payment was successful';
    } else {
      message = `Payment failed. status code: ${transaction.status}`;
    }

    await transaction.save();

    return { status: transaction.status, message };
  }
}
