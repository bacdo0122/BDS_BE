import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { status_bds } from '../../../enum/enum_common';

export class EditCategoryListingDto  {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

}
