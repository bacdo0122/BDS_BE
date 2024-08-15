import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetCategoryNewsDto } from "./dtos/getCategoryNews.dto";
import { CreateCategoryNewsDto } from "./dtos/createCategoryNews.dto";
import { CategoryNewsService } from "./categoryNews.service";
import { EditCategoryNewsDto } from "./dtos/editCategoryNews.dto";


@ApiTags("CatrgoryNews")
@Controller("/categoryNews")
export class CategoryNewsController{
    constructor(
        private CategoryNewsService: CategoryNewsService
    ){}

    @Get("/")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async find(@Query() query: GetCategoryNewsDto){
        return await this.CategoryNewsService.find(query)
    }

    @Post("/create")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    async create(@Body() payload: CreateCategoryNewsDto){
        return this.CategoryNewsService.create(payload);
    }

    @Put("/edit")
    async editNews(@Body() payload:EditCategoryNewsDto){
        return await this.CategoryNewsService.edit(payload)
    }

    @Post("/delete")
    async deleteNews(@Body() payload:{id: number}){
        return await this.CategoryNewsService.delete(payload)
    }
}