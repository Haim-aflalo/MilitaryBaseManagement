import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CommanderGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;

    if (!auth) throw new UnauthorizedException();

    const token = auth.split(' ')[1];

    try {
      const payload: any = await this.jwtService.verifyAsync(token, {
        secret: 'your-secret-key',
      });
      console.log(payload);
      if (payload.role !== 'commander') {
        throw new ForbiddenException('Commander only');
      }

      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
