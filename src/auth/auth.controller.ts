import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'register user' })
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException("Password do not match!")
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
  async login(@Body() body) {
    return body
  }
}
