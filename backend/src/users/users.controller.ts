import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':userId')
    async getUserByUserId(@Param('userId') userId:string) {
        return this.userService.getUserByUserId(userId);
    }

    @Post()
    async createNewUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createNewUser(createUserDto);
    }

    @Patch(':userId')
    async addComment(@Param('userId') userId,@Body() comment : {comment : string} ) {
        return this.userService.addComment(userId,comment.comment);
    }

}
