import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Exsisted } from "../../expections/Exsited.expection";
import NewCategoryrEntity from "../../entities/newCategory.entity";
import { EditDistrictDto } from "./dtos/editDistrict.dto";
import DistrictEntity from "../../entities/district.entity";
import { GetDistrictDto } from "./dtos/getDistrict.dto";
import { CreateDistrictDto } from "./dtos/createDistrict.dto";

@Injectable()
export class DistrictService{
    constructor(
        @InjectRepository(DistrictEntity)
    private DistrictRepository: Repository<DistrictEntity>,
    ){}

    async find({search, page, limit, name, wardId} : GetDistrictDto){
        let searchOption = [];
     if(search){
        searchOption = [{ name: Like(`%${search.trim()}%`) }];
     }
     let andOption: any = {};
    if (name) {
        andOption.name = Like(`%${name.trim()}%`);
    }
    if (Object.keys(andOption).length > 0) {
        searchOption.push(andOption);
      }
    const [data, total] = await this.DistrictRepository.findAndCount({
        where: searchOption.length > 0 ? searchOption : {},
        order: {id: "ASC"},
        take: limit,
        skip: (page - 1) * limit, 
        relations: ['ward']
      });

      return {
        data,
        total,
        currentPage: page,
        totalPage: Math.ceil(total / limit),
      };
    }

    async create(payload: CreateDistrictDto){
        const {
           name
          } = payload;
          const checkExistNews = await this.DistrictRepository.findOne({where: {name}})
          if(checkExistNews){
           throw new Exsisted();
          }
        else{
            const newNews = this.DistrictRepository.create({
                name
            }) 
            this.DistrictRepository.save(newNews, {
                reload: false,
              });
        }
    }


    async edit({id, name}: EditDistrictDto){
      const BDSData = {
        id, name
      };
      const instance = await this.DistrictRepository.findBy({ id: id });
      if(instance){
          Object.assign(instance[0], BDSData);
          return await this.DistrictRepository.save(instance[0]);
      } 
  }

  async delete(payload: {id: number}) {
    const instance = await this.DistrictRepository.findBy({ id: payload.id });
    if(instance){
      return await this.DistrictRepository.delete({ id: payload.id });
    }
  }
}