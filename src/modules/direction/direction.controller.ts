import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DirectionService } from "./direction.service";
import { GetDirectionDto } from "./dtos/getDirection.dto";
import { CreateDirectionDto } from "./dtos/createDirection.dto";
import { EditDirectionDto } from "./dtos/editDirection.dto";


@ApiTags("Direction")
@Controller("/direction")
export class DirectionController{
    constructor(
        private DirectionService: DirectionService
    ){}

    @Get("/")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async find(@Query() query: GetDirectionDto){
        return await this.DirectionService.find(query)
    }

    @Post("/create")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async create(@Body() payload: CreateDirectionDto){
        return this.DirectionService.create(payload);
    }

    @Put("/edit")
    async editNews(@Body() payload:EditDirectionDto){
        return await this.DirectionService.edit(payload)
    }

    @Post("/delete")
    async deleteNews(@Body() payload:{id: number}){
        return await this.DirectionService.delete(payload)
    }
}