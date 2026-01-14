import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(data: any): Promise<User | null> {
    const hash = await bcrypt.hash(data.password, 10);
    // data.password = hash;
    return await this.userModel.create({
      name: data.name,
      password: hash,
      email: data.email,
      role: data.role,
    });
  }

  async findOne(id: number) {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll();
    console.log(users);
    return users;
  }

  async findByName(name: string) {
    const user = await this.userModel.findOne({ where: { name } });
    return user?.dataValues;
  }

  async update(user: any) {
    const userToUpdate = await this.findOne(user.id);
    await this.userModel.update(
      { ...user, ...userToUpdate },
      { where: { id: user.id } },
    );
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (user) {
      return await user.destroy();
    }
  }
}
