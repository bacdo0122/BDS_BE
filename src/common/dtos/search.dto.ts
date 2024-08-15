import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class SearchDto  {
    @ApiPropertyOptional()
    @IsNumber()
    page: number;
  
    @ApiPropertyOptional()
    @IsNumber()
    limit: number;
  
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search: string;
}
