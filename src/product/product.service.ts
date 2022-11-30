import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private ProductModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.ProductModel.find().populate('category', 'name').exec();
  }

  async findOne(condition): Promise<ProductDocument> {
    return await this.ProductModel.findOne(condition).exec();
  }

  async create(data): Promise<Product> {
    return await new this.ProductModel(data).save();
  }

  async update(id: number, data): Promise<Product> {
    return this.ProductModel.findByIdAndUpdate(id, data).exec();
  }

  async delete(id: number): Promise<Product> {
    return await this.ProductModel.findByIdAndDelete(id).exec();
  }

  async countTotalProduct() {
    return await this.ProductModel.countDocuments();
  }
  
}
