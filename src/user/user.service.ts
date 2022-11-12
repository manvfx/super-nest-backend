import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.UserModel.find();
  }

  async findOne(condition): Promise<UserDocument> {
    return await this.UserModel.findOne(condition).exec();
  }

  async create(data): Promise<User> {
    return await new this.UserModel(data).save();
  }

  async update(id: number, data): Promise<User> {
    return this.UserModel.findByIdAndUpdate(id, data).exec();
  }

  async delete(id: number): Promise<User> {
    return await this.UserModel.findByIdAndDelete(id).exec();
  }
}
