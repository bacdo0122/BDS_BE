import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import NewsEntity from "../../entities/new.entity";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";



@Module(
    {
        imports: [TypeOrmModule.forFeature([NewsEntity])],
        controllers: [NewsController],
        providers: [NewsService],
        exports: [NewsService]
    }
)
export class NewsModule{}