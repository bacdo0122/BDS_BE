import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RegionService } from "./region.service";
import { CreateRegionDto } from "./dtos/createRegion.dto";
import { GetRegionDto } from "./dtos/getRegion.dto";
import { EditRegionDto } from "./dtos/editRegion.dto";

@ApiTags("Region")
@Controller("/region")
export class RegionController{
    constructor(
        private regionService: RegionService
    ){}

    @Get("/")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async find(@Query() query: GetRegionDto){
        return await this.regionService.find(query)
    }

    @Post("/create")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async create(@Body() payload: CreateRegionDto){
        return this.regionService.create(payload);
    }

    @Put("/edit")
    async edit(@Body() payload:EditRegionDto){
        return await this.regionService.edit(payload)
    }

    @Post("/delete")
    async delete(@Body() payload:{id: number}){
        return await this.regionService.delete(payload)
    }
}