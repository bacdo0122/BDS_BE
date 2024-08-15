import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import RegionEntity from "../../entities/region.entity";
import { Like, Repository } from "typeorm";
import { Exsisted } from "../../expections/Exsited.expection";
import { GetNewsDto } from "./dtos/getNews.dto";
import { CreateNewsDto } from "./dtos/createNews.dto";
import NewsEntity from "../../entities/new.entity";
import { EditNewsDto } from "./dtos/editNews.dto";

@Injectable()
export class NewsService{
    constructor(
        @InjectRepository(NewsEntity)
    private NewsRepository: Repository<NewsEntity>,
    ){}

    async find({search, page, limit, title, content} : GetNewsDto){
        let searchOption = [];
     if(search){
        searchOption = [{ title: Like(`%${search.trim()}%`) }];
     }
     let andOption: any = {};
    if (title) {
        andOption.title = Like(`%${title.trim()}%`);
    }
    if (Object.keys(andOption).length > 0) {
        searchOption.push(andOption);
      }
    const [data, total] = await this.NewsRepository.findAndCount({
        where: searchOption.length > 0 ? searchOption : {},
        order: {id: "ASC"},
        take: limit,
        skip: (page - 1) * limit,
        relations: ['category']
      });

      return {
        data,
        total,
        currentPage: page,
        totalPage: Math.ceil(total / limit),
      };
    }

    async create(payload: CreateNewsDto){
        const {
           title, content, userId, category_id
          } = payload;
          const checkExistNews = await this.NewsRepository.findOne({where: {title, userId}})
          if(checkExistNews){
           throw new Exsisted();
          }
        else{
            const newNews = this.NewsRepository.create({
                title, content, userId, category_id
            }) 
            this.NewsRepository.save(newNews, {
                reload: false,
              });
        }
    }

    async edit({id, title, content, userId, category_id}: EditNewsDto){
      const BDSData = {
        id, title, content, userId, category_id
      };
      const instance = await this.NewsRepository.findBy({ id: id });
      if(instance){ 
          Object.assign(instance[0], BDSData);
          return await this.NewsRepository.save(instance[0]);
      } 
  }

  async delete(payload: {id: number}) {
    const instance = await this.NewsRepository.findBy({ id: payload.id });
    if(instance){
      return await this.NewsRepository.delete({ id: payload.id });
    }
  }
}