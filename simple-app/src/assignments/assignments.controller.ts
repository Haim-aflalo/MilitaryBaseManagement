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
import { AssignmentsService } from './assignments.service';
import { CommanderGuard } from 'src/auth/auth.commander.guard';
import { soldierGuard } from 'src/auth/auth.soldier.guard';

@Controller('assignments')
export class AssignmentsController {
  constructor(private assignService: AssignmentsService) {}
  @Get()
  getHello(): string {
    return 'Hello';
  }
  @Post('create')
  @UseGuards(CommanderGuard)
  create(@Body() assign: { id: number; userId: number; shiftId: number }) {
    return this.assignService.createAssignment(assign);
  }
  @Get('getAll')
  @UseGuards(soldierGuard)
  getAll() {
    return this.assignService.findAll();
  }
  @Get('getById:id')
  @UseGuards(soldierGuard)
  getOne(@Param() id: number) {
    return this.assignService.findOne(id);
  }
  @Put('update')
  @UseGuards(CommanderGuard)
  updateUser(
    @Body()
    assign: {
      id: number;
      userId: number;
      shiftId: number;
    },
  ) {
    return this.assignService.update(assign);
  }
  @Delete('delete:id')
  @UseGuards(CommanderGuard)
  deleteUser(@Param() id: number) {
    return this.assignService.remove(id);
  }
}
