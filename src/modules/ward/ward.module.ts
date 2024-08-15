import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {  WardService } from "./ward.service";
import WardEntity from "../../entities/ward.entity";
import { WardController } from "./ward.controller";



@Module(
    {
        imports: [TypeOrmModule.forFeature([WardEntity])],
        controllers: [WardController],
        providers: [WardService],
        exports: [WardService]
    }
)
export class WardModule{}