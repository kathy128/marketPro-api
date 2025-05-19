import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authService.validateUser(
      createAuthDto.email,
      createAuthDto.password,
    );
     if (!user) {
      throw new Error('Credenciales incorrectas');
    }
    return this.authService.login(user);
  }
}
