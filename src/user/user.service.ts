import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
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

  async create(data): Promise<User> {
    return await new this.UserModel(data).save();
  }

  async findOne(condition): Promise<User> {
    return this.UserModel.findOne(condition);
  }
}
