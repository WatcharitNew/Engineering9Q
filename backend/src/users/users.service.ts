import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
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

    async createNewUser(createUserDto:CreateUserDto) {
        createUserDto.createdTime = new Date();
        return this.userRepository.insert(createUserDto);
    }
}
