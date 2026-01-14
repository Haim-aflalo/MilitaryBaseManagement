import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: any) {
    const user = await this.usersService.findByName(data.name);
    
    if (user && (await bcrypt.compare(data.password, user.password))) {
      const payload = { role: user.role, sub: user.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return null;
  }
}
