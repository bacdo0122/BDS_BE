import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { SearchDto } from '../../../common/dtos/search.dto';
import { status_bds } from '../../../enum/enum_common';

export class GetListingDto extends SearchDto  {
  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  type_id: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  direction_id: number;

  @ApiPropertyOptional()
  @IsNumber()
  pricePerArea: number;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  area: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEnum(status_bds)
  status: status_bds;

  @ApiPropertyOptional()
  legal_status: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  bedrooms: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  bathrooms: number;

  @ApiPropertyOptional()
  furnishing: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  orientation: string;


  @ApiPropertyOptional()
  @IsNumber()
  userId: number;

  @ApiPropertyOptional()
  @IsNumber()
  price: number;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  image: string;

}
