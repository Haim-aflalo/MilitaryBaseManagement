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
import { AssignmentsService } from './assignments.service';
import { AssignmentDto } from './dto/assignment.dto';
import { AuthGuard } from 'src/auth/auth.soldierGuard';
import { commanderGuard } from 'src/auth/auth.commanderGuard';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post('create')
  @UseGuards(commanderGuard)
  create(@Body() createAssignmentDto: AssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get('getAll')
  @UseGuards(AuthGuard)
  findAll() {
    return this.assignmentsService.findAll();
  }

  @Get('getOne:id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(+id);
  }

  @Patch('update:id')
  @UseGuards(commanderGuard)
  update(@Param('id') id: number, @Body() updateAssignmentDto: AssignmentDto) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  @Delete('delete:id')
  @UseGuards(commanderGuard)
  remove(@Param('id') id: number) {
    return this.assignmentsService.remove(id);
  }
}
