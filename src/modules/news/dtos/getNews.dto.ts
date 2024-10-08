import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { SearchDto } from '../../../common/dtos/search.dto';

export class GetNewsDto extends SearchDto  {
  @ApiPropertyOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  content: string; 

  @ApiPropertyOptional()
  @IsNumber()
  category: number; 

  @ApiPropertyOptional()
  @IsString()
  image: string;
}
