import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCreateDto } from './dto/product-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ProductUpdateDto } from './dto/product-update.dto';

@ApiTags('Product')
@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('list')
  @ApiOperation({ summary: 'Show product list' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() body: ProductCreateDto): Promise<Product> {
    return this.productService.create({
      title: body.title,
      description: body.description,
      image: body.image,
      price: body.price,
      category: body.category,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Show product list' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne({ _id: id });
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update single product' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: number,
    @Body() body: ProductUpdateDto,
  ): Promise<Product> {
    await this.productService.update(id, body);
    return this.productService.findOne({ _id: id });
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete single product' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id') id: number): Promise<Product> {
    return this.productService.delete(id);
  }
}
