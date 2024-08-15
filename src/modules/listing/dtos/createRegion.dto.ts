import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { status_bds } from '../../../enum/enum_common';

export class CreateListingDto  {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  type_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  area: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(status_bds)
  status: status_bds;

  @ApiProperty()
  legal_status: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bedrooms: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bathrooms: number;

  @ApiProperty()
  furnishing: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orientation: string;

  @ApiProperty()
  @IsNumber()
  price: number;


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;


}
