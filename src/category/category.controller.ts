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
  import { Category } from './schemas/category.schema';
  import { CategoryService } from './category.service';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { CategoryCreateDto } from './dto/category-create.dto';
  import { AuthGuard } from '../auth/auth.guard';
  import { CategoryUpdateDto } from './dto/category-update.dto';
  
  @ApiTags('categories')
  @UseGuards(AuthGuard)
  @Controller('categories')
  export class CategoryController {
    constructor(private categoryService: CategoryService) {}
  
    @Get('list')
    @ApiOperation({ summary: 'Show category list' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAll(): Promise<Category[]> {
      return this.categoryService.findAll();
    }
  
    @Post('create')
    @ApiOperation({ summary: 'category Category' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() body: CategoryCreateDto): Promise<Category> {
      return this.categoryService.create({
        name: body.name,
      });
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Show category list' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findOne(@Param('id') id: number): Promise<Category> {
      return this.categoryService.findOne({ _id: id });
    }
  
    @Patch('update/:id')
    @ApiOperation({ summary: 'Update single category' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async update(
      @Param('id') id: number,
      @Body() body: CategoryUpdateDto,
    ): Promise<Category> {
      await this.categoryService.update(id, body);
      return this.categoryService.findOne({ _id: id });
    }
  
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete single category' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async delete(@Param('id') id: number): Promise<Category> {
      return this.categoryService.delete(id);
    }
  }
  