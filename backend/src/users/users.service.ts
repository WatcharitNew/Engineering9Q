import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Major } from 'src/entities/user.entity';
import { Repository, Like } from 'typeorm';
import { CreateUserDto } from './users.dto';

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

    if(!createUserDto.helpStudy) createUserDto.helpStudy = "";
    if(!createUserDto.helpHealth) createUserDto.helpHealth = "";
    if(!createUserDto.helpOther) createUserDto.helpOther = "";

    if(!createUserDto.comment) createUserDto.comment = "";

    return this.userRepository.insert(createUserDto);
  }

  async addComment(userId: string, comment: string) {
    let editDto = {
      userId: userId,
      comment: comment,
    };
    return this.userRepository.save(editDto);
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
