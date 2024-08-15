import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

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
}
