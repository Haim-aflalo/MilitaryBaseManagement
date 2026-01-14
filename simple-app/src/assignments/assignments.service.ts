import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AssignmentDto } from './dto/assignment.dto';
import { Assignments } from './entities/assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignments)
    private readonly assignModel: typeof Assignments,
  ) {}
  async create(AssignmentDto: AssignmentDto): Promise<Assignments | null> {
    return await this.assignModel.create(AssignmentDto as any);
  }

  async findAll(): Promise<Assignments[] | null> {
    return await this.assignModel.findAll();
  }

  async findOne(id: number) {
    return await this.assignModel.findByPk(id);
  }

  async update(
    id: number,
    AssignmentDto: AssignmentDto,
  ): Promise<Assignments | undefined> {
    const assign = await this.assignModel.findByPk(id);
    return await assign?.update(AssignmentDto as any);
  }
  async remove(id: number): Promise<void> {
    const assign = await this.assignModel.findByPk(id);
    return await assign?.destroy();
  }
}
