import { IsInt } from 'class-validator';
export class AssignmentDto {
  @IsInt()
  UserId: number;

  @IsInt()
  ShiftId: number;
}
