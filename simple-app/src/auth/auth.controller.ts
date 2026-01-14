import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getHello(): string {
    return 'Hello';
  }
  @Post('login')
  async login(@Body() info: { name: string; password: string }) {
    return this.authService.login(info);
  }
}
