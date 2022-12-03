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
import { Subscription } from './schemas/subscription.schema';
import { SubscriptionService } from './subscription.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { SubscriptionCreateDto } from './dto/subscription-create.dto';
import { SubscriptionUpdateDto } from './dto/subscription-update.dto';

@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Get('list')
  @ApiOperation({ summary: 'Show subscription list' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Subscription[]> {
    return this.subscriptionService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create subscription' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() body: SubscriptionCreateDto): Promise<Subscription> {
    return this.subscriptionService.create({
      startDate: body.startDate,
      endDate: body.endDate,
      type: body.type,
      price: body.price,
      seller: body.seller,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Show subscription list' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: number): Promise<Subscription> {
    return this.subscriptionService.findOne({ _id: id });
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update single subscription' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: number,
    @Body() body: SubscriptionUpdateDto,
  ): Promise<Subscription> {
    await this.subscriptionService.update(id, body);
    return this.subscriptionService.findOne({ _id: id });
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete single subscription' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id') id: number): Promise<Subscription> {
    return this.subscriptionService.delete(id);
  }
}
