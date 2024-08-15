import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import NewsEntity from "../../entities/new.entity";
import { CategoryNewsController } from "./categoryNews.controller";
import { CategoryNewsService } from "./categoryNews.service";
import NewCategoryrEntity from "../../entities/newCategory.entity";



@Module(
    {
        imports: [TypeOrmModule.forFeature([NewCategoryrEntity])],
        controllers: [CategoryNewsController],
        providers: [CategoryNewsService],
        exports: [CategoryNewsService]
    }
)
export class CategoryNewsModule{}