import { IsString, IsDate } from 'class-validator';
export class ShiftDto {
  @IsDate()
  StartTime: Date;
  @IsDate()
  EndTime: Date;

  @IsString()
  location: string;
}
