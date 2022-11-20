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
  import { Manager } from './schemas/manager.schema';
  import { ManagerService } from './manager.service';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import * as bcrypt from 'bcrypt';
  import { ManagerCreateDto } from './dto/manager-create.dto';
  import { AuthInterceptor } from '../auth/auth.interceptor';
  import { AuthGuard } from '../auth/auth.guard';
  import { ManagerUpdateDto } from './dto/manager-update.dto';
  
  @ApiTags('manager')
  @SerializeOptions({
    excludePrefixes: ['password'],
  })
  @UseInterceptors(ClassSerializerInterceptor, AuthInterceptor)
  @UseGuards(AuthGuard)
  @Controller('manager')
  export class ManagerController {
    constructor(private managerService: ManagerService) {}
  
    @Get('list')
    @ApiOperation({ summary: 'Show manager list' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAll(): Promise<Manager[]> {
      return this.managerService.findAll();
    }
  
    @Post('create')
    @ApiOperation({ summary: 'Create manager' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() body: ManagerCreateDto): Promise<Manager> {
      const password = await bcrypt.hash('1234', 12);
      return this.managerService.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password,
      });
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Show manager list' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findOne(@Param('id') id: number): Promise<Manager> {
      return this.managerService.findOne({ _id: id });
    }
  
    @Patch('update/:id')
    @ApiOperation({ summary: 'Update single manager' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async update(
      @Param('id') id: number,
      @Body() body: ManagerUpdateDto,
    ): Promise<Manager> {
      await this.managerService.update(id, body);
      return this.managerService.findOne({ _id: id });
    }
  
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete single manager' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async delete(@Param('id') id: number): Promise<Manager> {
      return this.managerService.delete(id);
    }
  }
  