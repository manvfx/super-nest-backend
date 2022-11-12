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
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthInterceptor } from './auth.interceptor';

@ApiTags('auth')
@SerializeOptions({
  excludePrefixes: ['password'],
})
@UseInterceptors(ClassSerializerInterceptor, AuthInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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

  @Get('user')
  @ApiOperation({ summary: 'show user' })
  async user(@Req() request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);

    return this.userService.findOne({ id: data['id'] });
  }

  @Post('logout')
  @ApiOperation({ summary: 'show user' })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
}
