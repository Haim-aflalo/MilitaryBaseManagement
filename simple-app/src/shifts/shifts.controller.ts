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
import { ShiftsService } from './shifts.service';
import { ShiftDto } from './dto/shift.dto';
import { AuthGuard } from 'src/auth/auth.soldierGuard';
import { commanderGuard } from 'src/auth/auth.commanderGuard';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post('create')
  @UseGuards(commanderGuard)
  create(@Body() createShiftDto: ShiftDto) {
    return this.shiftsService.create(createShiftDto);
  }

  @Get('getAll')
  @UseGuards(AuthGuard)
  findAll() {
    return this.shiftsService.findAll();
  }

  @Get('getById:id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.shiftsService.findOne(+id);
  }

  @Patch('update:id')
  @UseGuards(commanderGuard)
  update(@Param('id') id: number, @Body() updateShiftDto: ShiftDto) {
    return this.shiftsService.update(id, updateShiftDto);
  }

  @Delete('remove:id')
  @UseGuards(commanderGuard)
  remove(@Param('id') id: number) {
    return this.shiftsService.remove(id);
  }
}
