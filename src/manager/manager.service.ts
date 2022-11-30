import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Manager, ManagerDocument } from './schemas/manager.schema';
import { Model } from 'mongoose';

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Manager.name)
    private ManagerModel: Model<Manager>,
  ) {}

  async findAll(): Promise<Manager[]> {
    return this.ManagerModel.find();
  }

  async findOne(condition): Promise<ManagerDocument> {
    return await this.ManagerModel.findOne(condition).exec();
  }

  async create(data): Promise<Manager> {
    return await new this.ManagerModel(data).save();
  }

  async update(id: number, data): Promise<Manager> {
    return this.ManagerModel.findByIdAndUpdate(id, data).exec();
  }

  async delete(id: number): Promise<Manager> {
    return await this.ManagerModel.findByIdAndDelete(id).exec();
  }

  async countTotalManager() {
    return await this.ManagerModel.countDocuments();
  }
}
