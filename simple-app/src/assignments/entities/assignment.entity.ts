import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ForeignKey } from 'sequelize-typescript';
import { Shifts } from 'src/shifts/entities/shift.entity';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'assignments',
  timestamps: true,
})
export class Assignments extends Model<Assignments> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Shifts)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  shiftId: number;
}
