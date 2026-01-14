import { Module } from '@nestjs/common';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shifts } from './shifts.model';

@Module({
  imports: [SequelizeModule.forFeature([Shifts])],
  controllers: [ShiftsController],
  providers: [ShiftsService],
})
export class ShiftsModule {}
