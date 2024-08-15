import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TypeListingService } from "./typeListing.service";
import { GetTypeListingDto } from "./dtos/getTypeBDS.dto";
import { CreateTypeListingDto } from "./dtos/createTypeBDS.dto";
import { EditTypeListingDto } from "./dtos/editTypeListing.dto";

@ApiTags("/typeListing")
@Controller("/typeListing")
export class TypeListingController{
    constructor(
        private typeListingService: TypeListingService
    ){}

    @Get("")
    async findTypeListing(@Query() query: GetTypeListingDto){
        return await this.typeListingService.find(query)
    }

    @Post("/create")
    async createTypeListing(@Body() payload:CreateTypeListingDto){
        return await this.typeListingService.create(payload)
    }


    @Put("/edit")
    async editCategoryListing(@Body() payload:EditTypeListingDto){
        return await this.typeListingService.edit(payload)
    }

    @Post("/delete")
    async deleteCategoryListing(@Body() payload:{id: number}){
        return await this.typeListingService.delete(payload)
    }
}