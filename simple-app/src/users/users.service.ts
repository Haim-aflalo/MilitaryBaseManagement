import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(createUserDto: UserDto): Promise<User | null> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.userModel.create(createUserDto as any);
  }

  async findAll(): Promise<User[] | null> {
    return await this.userModel.findAll();
  }

  async findByMail(email: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UserDto): Promise<User | undefined> {
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    const user = await this.userModel.findByPk(id);
    return await user?.update(updateUserDto);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userModel.findByPk(id);
    return await user?.destroy();
  }
}
