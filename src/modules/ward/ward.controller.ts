import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { WardService } from "./ward.service";
import { GetWardDto } from "./dtos/getWard.dto";
import { CreateWardDto } from "./dtos/createWard.dto";
import { EditWardDto } from "./dtos/editWard.dto";



@ApiTags("Ward")
@Controller("/ward")
export class WardController{
    constructor(
        private WardService: WardService
    ){}

    @Get("/")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async find(@Query() query: GetWardDto){
        return await this.WardService.find(query)
    }

    @Post("/create")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async create(@Body() payload: CreateWardDto){
        return this.WardService.create(payload);
    }

    @Put("/edit")
    async editNews(@Body() payload:EditWardDto){
        return await this.WardService.edit(payload)
    }

    @Post("/delete")
    async deleteNews(@Body() payload:{id: number}){
        return await this.WardService.delete(payload)
    }
}