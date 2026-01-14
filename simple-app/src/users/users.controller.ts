import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.soldierGuard';
import { commanderGuard } from 'src/auth/auth.commanderGuard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: UserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('getAll')
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('findByEmail:email')
  @UseGuards(AuthGuard)
  findOne(@Param('email') email: string) {
    return this.usersService.findByMail(email);
  }

  @Patch('update:id')
  @UseGuards(commanderGuard)
  update(@Param('id') id: number, @Body() updateUserDto: UserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete:id')
  @UseGuards(commanderGuard)
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
