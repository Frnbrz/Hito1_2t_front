import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user-dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const users: LoginUserDto[] = [
      {
        username: 'admin',
        password: 'admin',
      },
    ];
    const user: LoginUserDto = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (user) return user;

    return null;
  }

  async getJwtToken(user: LoginUserDto) {
    const payload = { username: user.username };

    console.log(payload, 'payload');

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
