import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shifts } from './shifts.model';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shifts)
    private readonly shiftModel: typeof Shifts,
  ) {}

  async createShift(shift: any) {
    return await this.shiftModel.create({ shift });
  }

  async findOne(id: number) {
    const shift = await this.shiftModel.findOne({
      where: {
        id,
      },
    });
    return shift?.dataValues;
  }

  async findAll(): Promise<Shifts[]> {
    return await this.shiftModel.findAll();
  }

  async update(shift: any) {
    const shiftToUpdate = await this.findOne(shift.id);
    await this.shiftModel.update(
      { ...shift, ...shiftToUpdate },
      { where: { id: shift.id } },
    );
  }

  async remove(id: number): Promise<void> {
    const shift = await this.findOne(id);
    return await shift?.destroy();
  }
}
