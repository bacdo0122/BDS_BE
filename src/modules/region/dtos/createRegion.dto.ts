import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateRegionDto  {

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  wardId: number;
}
