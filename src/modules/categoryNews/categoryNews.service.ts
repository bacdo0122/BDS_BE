import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import RegionEntity from "../../entities/region.entity";
import { Like, Repository } from "typeorm";
import { Exsisted } from "../../expections/Exsited.expection";
import NewsEntity from "../../entities/new.entity";
import { GetCategoryNewsDto } from "./dtos/getCategoryNews.dto";
import { CreateCategoryNewsDto } from "./dtos/createCategoryNews.dto";
import NewCategoryrEntity from "../../entities/newCategory.entity";
import { EditCategoryNewsDto } from "./dtos/editCategoryNews.dto";

@Injectable()
export class CategoryNewsService{
    constructor(
        @InjectRepository(NewCategoryrEntity)
    private NewsCategoryRepository: Repository<NewCategoryrEntity>,
    ){}

    async find({search, page, limit, name, description} : GetCategoryNewsDto){
        let searchOption = [];
     if(search){
        searchOption = [{ name: Like(`%${search.trim()}%`) }];
     }
     let andOption: any = {};
    if (name) {
        andOption.name = Like(`%${name.trim()}%`);
    }
    if (description) {
      andOption.description = Like(`%${description.trim()}%`);
  }
    if (Object.keys(andOption).length > 0) {
        searchOption.push(andOption);
      }
    const [data, total] = await this.NewsCategoryRepository.findAndCount({
        where: searchOption.length > 0 ? searchOption : {},
        order: {id: "ASC"},
        take: limit,
        skip: (page - 1) * limit,
      });

      return {
        data,
        total,
        currentPage: page,
        totalPage: Math.ceil(total / limit),
      };
    }

    async create(payload: CreateCategoryNewsDto){
        const {
           name, description
          } = payload;
          const checkExistNews = await this.NewsCategoryRepository.findOne({where: {name, description}})
          if(checkExistNews){
           throw new Exsisted();
          }
        else{
            const newNews = this.NewsCategoryRepository.create({
                name, description
            }) 
            this.NewsCategoryRepository.save(newNews, {
                reload: false,
              });
        }
    }


    async edit({id, name,description}: EditCategoryNewsDto){
      const BDSData = {
        id, name,description
      };
      const instance = await this.NewsCategoryRepository.findBy({ id: id });
      if(instance){
          Object.assign(instance[0], BDSData);
          return await this.NewsCategoryRepository.save(instance[0]);
      } 
  }

  async delete(payload: {id: number}) {
    const instance = await this.NewsCategoryRepository.findBy({ id: payload.id });
    if(instance){
      return await this.NewsCategoryRepository.delete({ id: payload.id });
    }
  }
}