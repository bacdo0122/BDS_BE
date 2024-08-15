import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { SearchDto } from '../../../common/dtos/search.dto';
import { status_bds } from '../../../enum/enum_common';

export class GetCategoryListingDto extends SearchDto  {

  @ApiPropertyOptional()
  @IsString()
  name: string;


  @ApiPropertyOptional()
  @IsString()
  description: string;


}
