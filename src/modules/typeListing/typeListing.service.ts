import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import TypeBDSEntity from "../../entities/listingType.entity";
import { In, Like, Repository } from "typeorm";
import TypeListingEntity from "../../entities/listingType.entity";
import { GetTypeListingDto } from "./dtos/getTypeBDS.dto";
import { CreateTypeListingDto } from "./dtos/createTypeBDS.dto";
import { EditTypeListingDto } from "./dtos/editTypeListing.dto";

@Injectable()
export class TypeListingService{
    constructor(
        @InjectRepository(TypeListingEntity)
        private TypeListingRepository: Repository<TypeListingEntity>
    ){}

    async find({search, page, limit, name, description}: GetTypeListingDto){
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

      const [data, total] = await this.TypeListingRepository.findAndCount({
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
    async create({name, description}: CreateTypeListingDto){
        const newListing = this.TypeListingRepository.create({
            name,
            description,
          });
          return this.TypeListingRepository.save(newListing, {
            reload: false,
          });
    }


    async edit({id, name, description}: EditTypeListingDto){
      const BDSData = {
      name,description
      };
      const instance = await this.TypeListingRepository.findBy({ id: id });
      if(instance){
          Object.assign(instance[0], BDSData);
          return await this.TypeListingRepository.save(instance[0]);
      } 
  }

  async delete(payload: {id: number}) {
    const instance = await this.TypeListingRepository.findBy({ id: payload.id });
    if(instance){
      return await this.TypeListingRepository.delete({ id: payload.id });
    }
  }

    async getManyByIds(ids: number[]) {
      return this.TypeListingRepository.find({
        where: {
          id: In(ids),
        },
      });
    }
}