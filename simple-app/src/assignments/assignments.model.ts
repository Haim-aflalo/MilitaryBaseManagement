import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ForeignKey } from 'sequelize-typescript';
import { Shifts } from 'src/shifts/shifts.model';
import { User } from 'src/users/users.model';

@Table({
  tableName: 'assignments',
  timestamps: true,
})
export class Assignments extends Model {
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
