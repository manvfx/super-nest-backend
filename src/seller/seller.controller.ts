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
  import { Seller } from './schemas/seller.schema';
  import { SellerService } from './seller.service';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import * as bcrypt from 'bcrypt';
  import { SellerCreateDto } from './dto/seller-create.dto';
  import { AuthInterceptor } from '../auth/auth.interceptor';
  import { AuthGuard } from '../auth/auth.guard';
  import { SellerUpdateDto } from './dto/seller-update.dto';
  
  @ApiTags('Seller')
  @SerializeOptions({
    excludePrefixes: ['password'],
  })
  @UseInterceptors(ClassSerializerInterceptor, AuthInterceptor)
  @UseGuards(AuthGuard)
  @Controller('seller')
  export class SellerController {
    constructor(private sellerService: SellerService) {}
  
    @Get('list')
    @ApiOperation({ summary: 'Show seller list' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAll(): Promise<Seller[]> {
      return this.sellerService.findAll();
    }
  
    @Post('create')
    @ApiOperation({ summary: 'Create seller' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() body: SellerCreateDto): Promise<Seller> {
      const password = await bcrypt.hash('1234', 12);
      return this.sellerService.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        mobile: body.mobile,
        shops: body.shops,
        password,
      });
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Show seller list' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findOne(@Param('id') id: number): Promise<Seller> {
      return this.sellerService.findOne({ _id: id });
    }
  
    @Patch('update/:id')
    @ApiOperation({ summary: 'Update single seller' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async update(
      @Param('id') id: number,
      @Body() body: SellerUpdateDto,
    ): Promise<Seller> {
      await this.sellerService.update(id, body);
      return this.sellerService.findOne({ _id: id });
    }
  
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete single seller' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async delete(@Param('id') id: number): Promise<Seller> {
      return this.sellerService.delete(id);
    }
  }
  