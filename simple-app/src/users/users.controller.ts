import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './users.model';
import { soldierGuard } from 'src/auth/auth.soldier.guard';
import { CommanderGuard } from 'src/auth/auth.commander.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getHello(): string {
    return 'Hello';
  }
  @Post('create')
  create(
    @Body()
    user,
  ) {
    return this.usersService.createUser(user);
  }
  @Get('getAll')
  @UseGuards(soldierGuard)
  getAll() {
    return this.usersService.findAll();
  }
  @Get('getById:id')
  @UseGuards(soldierGuard)
  getOne(@Param() id: number) {
    return this.usersService.findOne(id);
  }
  @Get('getById:name')
  @UseGuards(soldierGuard)
  getByName(@Param() name: string) {
    return this.usersService.findByName(name);
  }
  @Put('update')
  @UseGuards(CommanderGuard)
  updateUser(
    @Body()
    user: {
      name: string;
      password: string;
      email: string;
      role: UserRole;
    },
  ) {
    return this.usersService.update(user);
  }
  @Delete('delete:id')
  @UseGuards(CommanderGuard)
  deleteUser(@Param() id: number) {
    return this.usersService.remove(id);
  }
}
