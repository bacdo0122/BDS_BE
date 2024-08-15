import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import TypeBDSEntity from "../../entities/listingType.entity";
import { TypeListingController } from "./typeListing.controller";
import { TypeListingService } from "./typeListing.service";
import TypeListingEntity from "../../entities/listingType.entity";


@Module({
    imports: [TypeOrmModule.forFeature([TypeListingEntity])],
    controllers: [TypeListingController],
    providers: [TypeListingService],
    exports: [TypeListingService]
})
export class TypeListingModule{}