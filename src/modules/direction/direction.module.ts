import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DirectionEntity from "../../entities/direction.entity";
import { DirectionController } from "./direction.controller";
import { DirectionService } from "./direction.service";



@Module(
    {
        imports: [TypeOrmModule.forFeature([DirectionEntity])],
        controllers: [DirectionController],
        providers: [DirectionService],
        exports: [DirectionService]
    }
)
export class DirectionModule{}