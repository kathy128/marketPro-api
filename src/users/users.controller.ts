import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiTags('register')
  async create(@Body() createUserDto: CreateUserDto) {
  const user = await this.usersService.create(createUserDto);
    return { message: 'Usuario registrado correctamente', userId: user.id };  }
}
