import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  @ApiProperty({ example: 'Johne@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'John Doe' })
  @IsEmail()
  fullname: string;

  @ApiProperty({ example: 'Aiasmngiagaso23123' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Aiasmngiagaso23123' })
  @IsNotEmpty()
  @MinLength(8)
  confirmPassword: string;

  @ApiProperty({ example: 'admin' })
  @IsEnum(UserRole)
  role: UserRole;
}
