import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteListingDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;
  
  
  }