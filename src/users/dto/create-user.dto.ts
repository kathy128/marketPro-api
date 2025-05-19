import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  @ApiProperty({ example: 'diana@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Diana' })
  @IsString()
  name: string;

  @ApiProperty({ example: '123456789M.' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: '123456789M.' })
  @IsNotEmpty()
  @MinLength(8)
  confirmPassword: string;

  @ApiProperty({ example: 'admin' })
  @IsEnum(UserRole)
  role: UserRole;
}
