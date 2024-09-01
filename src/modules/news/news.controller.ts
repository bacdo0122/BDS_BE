import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetNewsDto } from "./dtos/getNews.dto";
import { CreateNewsDto } from "./dtos/createNews.dto";
import { NewsService } from "./news.service";
import { EditNewsDto } from "./dtos/editNews.dto";
import { GetNewsOneDto } from "./dtos/getOne.dto";

@ApiTags("News")
@Controller("/news")
export class NewsController{
    constructor(
        private newsService: NewsService
    ){}

    @Get("/")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async find(@Query() query: GetNewsDto){
        return await this.newsService.find(query)
    }

    @Get("/getOne")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async findOne(@Query() query: GetNewsOneDto){
        return await this.newsService.findOne(query)
    }

    @Post("/create")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async create(@Body() payload: CreateNewsDto){
        return this.newsService.create(payload);
    }

    @Put("/edit")
    async editNews(@Body() payload:EditNewsDto){
        return await this.newsService.edit(payload)
    }

    @Post("/delete")
    async deleteNews(@Body() payload:{id: number}){
        return await this.newsService.delete(payload)
    }
}