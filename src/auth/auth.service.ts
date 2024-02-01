import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const users = [
  {
    id: 1,
    username: 'caio',
    password: '123456',
  },
  {
    id: 2,
    username: 'wanessa',
    password: '123456',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
