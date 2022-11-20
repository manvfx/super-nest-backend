import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private CategoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.CategoryModel.find();
  }

  async findOne(condition): Promise<CategoryDocument> {
    return await this.CategoryModel.findOne(condition).exec();
  }

  async create(data): Promise<Category> {
    return await new this.CategoryModel(data).save();
  }

  async update(id: number, data): Promise<Category> {
    return this.CategoryModel.findByIdAndUpdate(id, data).exec();
  }

  async delete(id: number): Promise<Category> {
    return await this.CategoryModel.findByIdAndDelete(id).exec();
  }
}
