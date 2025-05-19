import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}
@Injectable()
export class AuthService {
   constructor(  
private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,  ){}

   async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    const isPasswordValid = await bcrypt.compare(password, user!.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    return user;
  }

  async login(user: any) {
    const payload: JwtPayload = { id: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        role: user.role,
        id: user.id,
      },
    };
  }
}
