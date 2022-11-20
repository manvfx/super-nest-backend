import {
  Controller,
  Get,
  Post,
  Body,
  ClassSerializerInterceptor,
  SerializeOptions,
  UseInterceptors,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './dto/user-create.dto';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { UserUpdateDto } from './dto/user-update.dto';

@ApiTags('users')
@SerializeOptions({
  excludePrefixes: ['password'],
})
@UseInterceptors(ClassSerializerInterceptor, AuthInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('list')
  @ApiOperation({ summary: 'Show user list' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('1234', 12);
    return this.userService.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Show user list' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne({ _id: id });
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update single user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: number,
    @Body() body: UserUpdateDto,
  ): Promise<User> {
    await this.userService.update(id, body);
    return this.userService.findOne({ _id: id });
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete single user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id') id: number): Promise<User> {
    return this.userService.delete(id);
  }
}
