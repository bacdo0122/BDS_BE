import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ListingEntity from "../../entities/listing.entity";
import { ListingController } from "./listing.controller";
import { ListingService } from "./listing.service";
import { TypeListingService } from "../typeListing/typeListing.service";
import ListingCategoryEntity from "../../entities/listingCategory.entity";
import TypeListingEntity from "../../entities/listingType.entity";
import { ListingCategoryService } from "../categoryListing/categoryListing.service";


@Module({
    imports: [TypeOrmModule.forFeature([ListingEntity, ListingCategoryEntity, TypeListingEntity])],
    controllers: [ListingController],
    providers: [ListingService, TypeListingService, ListingCategoryService],
    exports: [ListingService, TypeListingService, ListingCategoryService]
})
export class ListingModule{}