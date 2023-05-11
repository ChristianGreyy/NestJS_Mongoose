import { Injectable, NotFoundException } from '@nestjs/common';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async createUser(createUserDto: any | CreateUserDto): Promise<UserDocument> {
    const hashedPassword: string = await bcrypt.hash(createUserDto.password, 7);
    createUserDto['password'] = hashedPassword;
    return this.userModel.create(createUserDto);
  }

  async getUserById(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    return user;
  }

  async updateUserById(
    updateUserDto: any | UpdateUserDto,
    userId: string,
  ): Promise<any> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    await user.save();
    return user;
  }

  async deleteUserById(userId: string): Promise<any> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.deleteOne({ _id: user._id });
    return user;
  }
}
