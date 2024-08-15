import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import TypeBDSEntity from "../../entities/listingType.entity";
import { In, Like, Repository } from "typeorm";
import TypeListingEntity from "../../entities/listingType.entity";
import ListingCategoryEntity from "../../entities/listingCategory.entity";
import { GetCategoryListingDto } from "./dtos/getCategoryListing.dto";
import { CreateCategoryListingDto } from "./dtos/createCategoryListing.dto";
import { EditCategoryListingDto } from "./dtos/editCategoryListing.dto";


@Injectable()
export class ListingCategoryService{
    constructor(
        @InjectRepository(ListingCategoryEntity)
        private CategoryListingRepository: Repository<ListingCategoryEntity>
    ){}

    async find({search, page, limit, name, description}: GetCategoryListingDto){
        let searchOption = [];
     if(search){
        searchOption = [{ name: Like(`%${search.trim()}%`) }];
     }
     let andOption: any = {};
    if (name) {
        andOption.name = Like(`%${name.trim()}%`);
    }
    if (name) {
        andOption.description = Like(`%${description.trim()}%`);
    }

    if (Object.keys(andOption).length > 0) {
        searchOption.push(andOption);
      }

      const [data, total] = await this.CategoryListingRepository.findAndCount({
        where: searchOption.length > 0 ? searchOption : {},
        order: {id: "ASC"},
        take: limit,
        skip: (page - 1) * limit,
        relations: ['listings']
      });

      return {
        data,
        total,
        currentPage: page,
        totalPage: Math.ceil(total / limit),
      };
  }
    async create({name, description}: CreateCategoryListingDto){
        const newListing = this.CategoryListingRepository.create({
            name,
            description,
          });
          return this.CategoryListingRepository.save(newListing, {
            reload: false,
          });
    }

    async edit({id, name, description}: EditCategoryListingDto){
      const BDSData = {
      name,description
      };
      const instance = await this.CategoryListingRepository.findBy({ id: id });
      if(instance){
          Object.assign(instance[0], BDSData);
          return await this.CategoryListingRepository.save(instance[0]);
      } 
  }

  async delete(payload: {id: number}) {
    const instance = await this.CategoryListingRepository.findBy({ id: payload.id });
    if(instance){
      return await this.CategoryListingRepository.delete({ id: payload.id });
    }
  }

    async getManyByIds(ids: number[]) {
      return this.CategoryListingRepository.find({
        where: {
          id: In(ids),
        },
      });
    }
}