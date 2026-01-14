import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(authDto: AuthDto) {
    const user = await this.usersService.findByMail(authDto.email);

    if (user && (await bcrypt.compare(authDto.password, user.password))) {
      const payload = { role: user.role, sub: user.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return null;
  }
}
