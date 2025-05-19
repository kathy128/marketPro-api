import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
  const user = await this.usersService.create(createUserDto);
    return { message: 'Usuario registrado correctamente', userId: user.id };  }
  
  @UseGuards(JwtAuthGuard)
  @Get('sellers')
  async getAllSellers(): Promise<User[]> {
    return this.usersService.findAllSellers();
  }
}
