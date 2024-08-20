import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { role_user } from '../../../enum/enum_common';

export class EditUserDto  {
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
    @IsString()
    @IsNotEmpty()
    role: role_user; 
}
