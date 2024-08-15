import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { DistrictService } from "./district.service";
import { GetDistrictDto } from "./dtos/getDistrict.dto";
import { CreateDistrictDto } from "./dtos/createDistrict.dto";
import { EditDistrictDto } from "./dtos/editDistrict.dto";


@ApiTags("District")
@Controller("/district")
export class DistrictController{
    constructor(
        private DistrictService: DistrictService
    ){}

    @Get("/")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async find(@Query() query: GetDistrictDto){
        return await this.DistrictService.find(query)
    }

    @Post("/create")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async create(@Body() payload: CreateDistrictDto){
        return this.DistrictService.create(payload);
    }

    @Put("/edit")
    async editNews(@Body() payload:EditDistrictDto){
        return await this.DistrictService.edit(payload)
    }

    @Post("/delete")
    async deleteNews(@Body() payload:{id: number}){
        return await this.DistrictService.delete(payload)
    }
}