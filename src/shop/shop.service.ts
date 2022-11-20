import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shop, ShopDocument } from './schemas/shop.schema';
import { Model } from 'mongoose';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name)
    private ShopModel: Model<Shop>,
  ) {}

  async findAll(): Promise<Shop[]> {
    return this.ShopModel.find();
  }

  async findOne(condition): Promise<ShopDocument> {
    return await this.ShopModel.findOne(condition).exec();
  }

  async create(data): Promise<Shop> {
    return await new this.ShopModel(data).save();
  }

  async update(id: number, data): Promise<Shop> {
    return this.ShopModel.findByIdAndUpdate(id, data).exec();
  }

  async delete(id: number): Promise<Shop> {
    return await this.ShopModel.findByIdAndDelete(id).exec();
  }
}