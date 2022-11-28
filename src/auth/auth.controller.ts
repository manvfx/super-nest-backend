import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { LoginOtpDto } from './dto/login-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SmsService } from 'src/sms/sms.service';

@ApiTags('Auth')
@SerializeOptions({
  excludePrefixes: ['password'],
})
@UseInterceptors(ClassSerializerInterceptor, AuthInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly smsService: SmsService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'register user' })
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Password do not match!');
    }
    const hashed = await bcrypt.hash(body.password, 12);

    return this.userService.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashed,
      mobile: body.mobile,
    });
  }

  @Post('login')
  @ApiOperation({ summary: 'login user' })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user._id });
    response.cookie('jwt', jwt, { httpOnly: true });
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('user')
  @ApiOperation({ summary: 'show user profile' })
  async user(@Req() request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    return this.userService.findOne({ _id: data['id'] });
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'show user' })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'User logout successfully',
    };
  }

  @Post('login-otp')
  @ApiOperation({ summary: 'login otp' })
  async loginByOtp(
    @Body() body: LoginOtpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ mobile: body.mobile });

    if (!user) {
      throw new NotFoundException('User Not Found');
    } else {
      const smsResult = await this.smsService.sendOtpCode(body.mobile);
      await this.userService.update(user._id, {
        verifyCode: smsResult.verifyCode,
      });
      return {
        mobile : user.mobile,
        message: 'The 4-digit activation code was sent via SMS',
      };
    }
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'verify otp' })
  async verifyOtpCode(
    @Body() body: VerifyOtpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({
      mobile: body.mobile,
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (body.verifyCode !== user.verifyCode) {
      throw new BadRequestException('SMS activation code does not match');
    }

    await this.userService.update(user._id, {
      verifyAt: Date.now(),
    });
    const jwt = await this.jwtService.signAsync({ id: user._id });
    response.cookie('jwt', jwt, { httpOnly: true });
    return user;
  }
}
