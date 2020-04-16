import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Major } from 'src/entities/user.entity';
import { Repository, Like } from 'typeorm';
import { CreateUserDto, EditUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserByUserId(userId: string): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  async createNewUser(createUserDto: CreateUserDto) {
    createUserDto.createdTime = new Date();
    createUserDto.sumScore = 0;
    createUserDto.scores.forEach(score => (createUserDto.sumScore += score));

    return this.userRepository.insert(createUserDto);
  }

  async addComment(editUserDto: EditUserDto) {
    return this.userRepository.save(editUserDto);
  }

  async getUserByFilter(major: Major, year: string): Promise<User[]> {
    if (!year) year = '';
    if (!major) {
      return this.userRepository.find({
        where: {
          userId: Like(`${year}%`),
        },
      });
    } else {
      return this.userRepository.find({
        where: {
          userId: Like(`${year}%`),
          major: Like(`${major}`),
        },
      });
    }
  }
}
