import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'shifts',
  timestamps: true,
})
export class Shifts extends Model<Shifts> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startTime: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endTime: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;
}
