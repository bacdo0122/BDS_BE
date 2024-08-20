import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetListingDto } from "./dtos/getRegion.dto";
import { CreateListingDto } from "./dtos/createRegion.dto";
import { ListingService } from "./listing.service";
import { EditListingDto } from "./dtos/editListing.dto";
import { DeleteListingDto } from "./dtos/deleteListing.dto";
import { GetOneListingDto } from "./dtos/getOneListing.dto";
import { ConfirmListingDto } from "./dtos/confirmListing.dto";

@ApiTags("Listings")
@Controller("/listing")
export class ListingController{
    constructor(
        private listingService: ListingService
    ){}

    @Get("/")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async find(@Query() query: GetListingDto){
        return await this.listingService.find(query)
    }

    @Get("/getOne")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async findOne(@Query() query: GetOneListingDto){
        return await this.listingService.findOne(query)
    }

    @Post("/create")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async create(@Body() payload: CreateListingDto){
        return this.listingService.create(payload);
    }

    @Put("/edit")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async edit(@Body() payload: EditListingDto){
        return this.listingService.edit(payload);
    }

    @Post("/confirm")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async confirm(@Body() payload: ConfirmListingDto){
        return this.listingService.confirm(payload);
    }

    @Post("/delete")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async delete(@Body() payload: DeleteListingDto){
        return this.listingService.delete(payload);
    }
}