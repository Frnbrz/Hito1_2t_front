import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: LoginUserDto): Promise<{
    access_token: string;
  }> {
    const userEntry = this.authService.validateUser(
      user.username,
      user.password,
    );

    if (!userEntry) throw new UnauthorizedException('Invalid credentials');

    const token = this.authService.getJwtToken(user);

    return token;
  }
}
