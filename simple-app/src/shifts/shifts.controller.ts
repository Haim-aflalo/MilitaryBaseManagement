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
import { ShiftsService } from './shifts.service';
import { soldierGuard } from 'src/auth/auth.soldier.guard';
import { CommanderGuard } from 'src/auth/auth.commander.guard';

@Controller('shifts')
export class ShiftsController {
  constructor(private shiftServices: ShiftsService) {}
  @Get()
  getHello(): string {
    return 'Hello';
  }
  @Post('create')
  @UseGuards(CommanderGuard)
  create(
    @Body()
    shift: {
      id: number;
      startTime: Date;
      endTime: Date;
      location: string;
    },
  ) {
    return this.shiftServices.createShift({ shift });
  }
  @Get('getAll')
  @UseGuards(soldierGuard)
  getAll() {
    return this.shiftServices.findAll();
  }
  @Get('getById:id')
  @UseGuards(soldierGuard)
  getOne(@Param() id: number) {
    return this.shiftServices.findOne(id);
  }

  @Put('update')
  @UseGuards(CommanderGuard)
  updateUser(
    @Body()
    shift: {
      id: number;
      startTime: Date;
      endTime: Date;
      location: string;
    },
  ) {
    return this.shiftServices.update(shift);
  }
  @Delete('delete:id')
  @UseGuards(CommanderGuard)
  deleteUser(@Param() id: number) {
    return this.shiftServices.remove(id);
  }
}
