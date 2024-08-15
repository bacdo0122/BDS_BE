import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import NewsEntity from "../../entities/new.entity";
import NewCategoryrEntity from "../../entities/newCategory.entity";
import DistrictEntity from "../../entities/district.entity";
import { DistrictController } from "./district.controller";
import { DistrictService } from "./district.service";



@Module(
    {
        imports: [TypeOrmModule.forFeature([DistrictEntity])],
        controllers: [DistrictController],
        providers: [DistrictService],
        exports: [DistrictService]
    }
)
export class DistrictModule{}