import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  createUser(@Body() body) {
    return this.usersService.createUser(body)
  }

  @Get()
  getUsers() {
    return this.usersService.findAll()
  }

}
