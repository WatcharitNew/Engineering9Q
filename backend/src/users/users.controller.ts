import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, EditUserDto } from './users.dto';
import { Major } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  async getUserByFilter(
    @Query('major') major: Major,
    @Query('year') year: string,
  ) {
    return this.userService.getUserByFilter(major, year);
  }

  @Get(':userId')
  async getUserByUserId(@Param('userId') userId: string) {
    return this.userService.getUserByUserId(userId);
  }

  @Post()
  async createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createNewUser(createUserDto);
  }

  @Patch(':userId')
  async addComment(@Param('userId') userId, @Body() editUserDto: EditUserDto) {
    editUserDto.userId = userId;
    return this.userService.addComment(editUserDto);
  }
}
