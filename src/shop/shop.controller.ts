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
import { Shop } from './schemas/shop.schema';
import { ShopService } from './shop.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShopCreateDto } from './dto/shop-create.dto';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { ShopUpdateDto } from './dto/shop-update.dto';

@ApiTags('Shop')
@SerializeOptions({
  excludePrefixes: ['password'],
})
@UseInterceptors(ClassSerializerInterceptor, AuthInterceptor)
@UseGuards(AuthGuard)
@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('list')
  @ApiOperation({ summary: 'Show Shop list' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Shop[]> {
    return this.shopService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: 'Create shop' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() body: ShopCreateDto): Promise<Shop> {
    return this.shopService.create({
      name: body.name,
      description: body.description,
      address: body.address,
      location: body.location,
      image: body.image,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Show shop list' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: number): Promise<Shop> {
    return this.shopService.findOne({ _id: id });
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update single shop' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: number,
    @Body() body: ShopUpdateDto,
  ): Promise<Shop> {
    await this.shopService.update(id, body);
    return this.shopService.findOne({ _id: id });
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete single shop' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id') id: number): Promise<Shop> {
    return this.shopService.delete(id);
  }
}
