import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetOneListingDto   {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;

  }
  