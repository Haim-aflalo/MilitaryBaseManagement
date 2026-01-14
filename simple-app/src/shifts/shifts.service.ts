import { ShiftDto } from './dto/shift.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shifts } from './entities/shift.entity';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shifts)
    private readonly shiftsModel: typeof Shifts,
  ) {}
  async create(createShiftDto: ShiftDto): Promise<Shifts | null> {
    return await this.shiftsModel.create(createShiftDto as any);
  }

  async findAll(): Promise<Shifts[] | null> {
    return await this.shiftsModel.findAll();
  }

  async findOne(id: number) {
    return await this.shiftsModel.findByPk(id);
  }

  async update(id: number, ShiftDto: ShiftDto): Promise<Shifts | undefined> {
    const shift = await this.shiftsModel.findByPk(id);
    return await shift?.update(ShiftDto as any);
  }
  async remove(id: number): Promise<void> {
    const shift = await this.shiftsModel.findByPk(id);
    return await shift?.destroy();
  }
}
