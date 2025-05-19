import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {

  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;


  @ApiProperty({ example: 'Password1' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
