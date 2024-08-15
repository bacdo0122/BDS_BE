import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { role_user } from '../../../enum/enum_common';

export class CreateUserDto  {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6,20)
  @IsNotEmpty()
  password: string; 

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(role_user)
  role: role_user;

}
