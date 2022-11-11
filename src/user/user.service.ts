import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(data): Promise<User> {
    return this.userRepository.save(data);
  }
}
