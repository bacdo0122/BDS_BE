import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { SearchDto } from '../../../common/dtos/search.dto';

export class GetNewsOneDto   {


  @ApiPropertyOptional()
  @IsNumber()
  id: number; 
}
