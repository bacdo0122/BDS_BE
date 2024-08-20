import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

import { status_bds } from '../../../enum/enum_common';

export class ConfirmListingDto    {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(status_bds)
  status: status_bds;

}
