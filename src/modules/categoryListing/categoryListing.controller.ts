import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ListingCategoryService } from "./categoryListing.service";
import { GetCategoryListingDto } from "./dtos/getCategoryListing.dto";
import { CreateCategoryListingDto } from "./dtos/createCategoryListing.dto";
import { EditCategoryListingDto } from "./dtos/editCategoryListing.dto";

@ApiTags("/categoryListing")
@Controller("/categoryListing")
export class CategoryListingController{
    constructor( 
        private categoryListingService: ListingCategoryService
    ){}

    @Get("")
    async findcategoryListing(@Query() query: GetCategoryListingDto){
        return await this.categoryListingService.find(query)
    }

    @Post("/create")
    async createCategoryListing(@Body() payload:CreateCategoryListingDto){
        return await this.categoryListingService.create(payload)
    }

    @Put("/edit")
    async editCategoryListing(@Body() payload:EditCategoryListingDto){
        return await this.categoryListingService.edit(payload)
    }

    @Post("/delete")
    async deleteCategoryListing(@Body() payload:{id: number}){
        return await this.categoryListingService.delete(payload)
    }
}