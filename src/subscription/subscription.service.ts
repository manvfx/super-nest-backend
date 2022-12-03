import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from './schemas/subscription.schema';
import { Model } from 'mongoose';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private SubscriptionModel: Model<Subscription>,
  ) {}

  async findAll(): Promise<Subscription[]> {
    return this.SubscriptionModel.find();
  }

  async findOne(condition): Promise<SubscriptionDocument> {
    return await this.SubscriptionModel.findOne(condition).exec();
  }

  async create(data): Promise<Subscription> {
    return await new this.SubscriptionModel(data).save();
  }

  async update(id: number, data): Promise<Subscription> {
    return this.SubscriptionModel.findByIdAndUpdate(id, data).exec();
  }

  async delete(id: number): Promise<Subscription> {
    return await this.SubscriptionModel.findByIdAndDelete(id).exec();
  }

  async countTotalSubscription() {
    return await this.SubscriptionModel.countDocuments();
  }
}
