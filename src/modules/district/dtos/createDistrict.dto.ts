import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateDistrictDto  {
  @ApiProperty()
  @IsString()
  name: string;

}
