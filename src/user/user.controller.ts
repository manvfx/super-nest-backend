import { Controller, Get } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get("list")
  @ApiOperation({ summary: 'Show user list' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
