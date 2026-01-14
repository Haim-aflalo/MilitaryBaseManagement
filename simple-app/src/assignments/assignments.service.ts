import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Assignments } from './assignments.model';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignments)
    private readonly assignmentModel: typeof Assignments,
  ) {}

  async createAssignment(assignment: any): Promise<Assignments | null> {
    return await this.assignmentModel.create({
      assignment,
    });
  }

  async findOne(id: number) {
    const assign = await this.assignmentModel.findOne({
      where: {
        id,
      },
    });
    return assign?.dataValues;
  }

  async findAll(): Promise<Assignments[]> {
    return await this.assignmentModel.findAll();
  }

  async update(assignment: any) {
    const assignmentsToUpdate = await this.findOne(assignment.id);
    await this.assignmentModel.update(
      { ...assignment, ...assignmentsToUpdate },
      { where: { id: assignment.id } },
    );
  }

  async remove(id: number): Promise<void> {
    const assignment = await this.findOne(id);
    return await assignment?.destroy();
  }
}
