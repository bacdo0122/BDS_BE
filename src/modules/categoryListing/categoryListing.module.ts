import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryListingController } from "./categoryListing.controller";
import ListingCategoryEntity from "../../entities/listingCategory.entity";
import { ListingCategoryService } from "./categoryListing.service";


@Module({
    imports: [TypeOrmModule.forFeature([ListingCategoryEntity])],
    controllers: [CategoryListingController],
    providers: [ListingCategoryService],
    exports: [ListingCategoryService]
})
export class ListingCategoryModule{}