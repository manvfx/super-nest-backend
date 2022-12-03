import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('request')
  @ApiOperation({ summary: 'Request to payment gateway' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async paymentRequest() {
    return this.paymentService.paymentRequest(
      2000,
      '/payment/success/',
      'for buy subscription',
      '637ba44f62f30e3fd85e89bf',
      '638aed06018a977a232d23e6',
    );
  }

  async paymentVerify() {
    return this.paymentService.paymentVerify('authority');
  }
}
