import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, confirmPassword, role, name } = createUserDto;
    if (password !== confirmPassword) {
      throw new ConflictException('Las contraseñas no coinciden');
    }
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('El usuario ya existe');
    }
    const hash = await bcrypt.hash(password, 5);
    const user = this.usersRepository.create({
      email,
      password: hash,
      role,
      name,
    });
    return this.usersRepository.save(user);
  }
  
  async findOneByEmail(email: string): Promise<User|null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOne(id: number): Promise<User|null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findAllSellers(): Promise<User[]> {
    return this.usersRepository.find({
      where: { role: UserRole.SELLER },
    });
  }

}
