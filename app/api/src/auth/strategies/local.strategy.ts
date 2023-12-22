import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
    this.authService = authService;
  }
  async validate(email: string, password: string) {
    const user: LoginUserDto = await this.authService.validateUser(
      email,
      password,
    );
    console.log(user, 'user');
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}
