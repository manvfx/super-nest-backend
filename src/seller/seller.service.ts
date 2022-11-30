import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Seller, SellerDocument } from './schemas/seller.schema';
import { Model } from 'mongoose';

@Injectable()
export class SellerService {
  constructor(
    @InjectModel(Seller.name)
    private SellerModel: Model<Seller>,
  ) {}

  async findAll(): Promise<Seller[]> {
    return this.SellerModel.find().populate('shops', 'name').exec();
  }

  async findOne(condition): Promise<SellerDocument> {
    return await this.SellerModel.findOne(condition).exec();
  }

  async create(data): Promise<Seller> {
    return await new this.SellerModel(data).save();
  }

  async update(id: number, data): Promise<Seller> {
    return this.SellerModel.findByIdAndUpdate(id, data).exec();
  }

  async delete(id: number): Promise<Seller> {
    return await this.SellerModel.findByIdAndDelete(id).exec();
  }

  async countTotalSeller() {
    return await this.SellerModel.countDocuments();
  }
}
