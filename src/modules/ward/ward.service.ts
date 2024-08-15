import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Exsisted } from "../../expections/Exsited.expection";
import NewCategoryrEntity from "../../entities/newCategory.entity";
import DistrictEntity from "../../entities/district.entity";
import WardEntity from "../../entities/ward.entity";
import { GetWardDto } from "./dtos/getWard.dto";
import { CreateWardDto } from "./dtos/createWard.dto";
import { EditWardDto } from "./dtos/editWard.dto";


@Injectable()
export class WardService{
    constructor(
        @InjectRepository(WardEntity)
    private WardRepository: Repository<WardEntity>,
    ){}

    async find({search, page, limit, name, districtId} : GetWardDto){
        let searchOption = [];
     if(search){
        searchOption = [{ name: Like(`%${search.trim()}%`) }];
     }
     let andOption: any = {};
    if (name) {
        andOption.name = Like(`%${name.trim()}%`);
    }
    if(districtId){
      andOption.districtId = districtId;
    }
    if (Object.keys(andOption).length > 0) {
        searchOption.push(andOption);
      }
    const [data, total] = await this.WardRepository.findAndCount({
        where: searchOption.length > 0 ? searchOption : {},
        order: {id: "ASC"},
        take: limit,
        skip: (page - 1) * limit,
        relations: ['district']
      });

      return {
        data,
        total,
        currentPage: page,
        totalPage: Math.ceil(total / limit),
      };
    }

    async create(payload: CreateWardDto){
        const {
           name, districtId
          } = payload;
          const checkExistNews = await this.WardRepository.findOne({where: {name}})
          if(checkExistNews){
           throw new Exsisted();
          }
        else{
            const newNews = this.WardRepository.create({
                name, districtId
            }) 
            this.WardRepository.save(newNews, {
                reload: false,
              });
        }
    }


    async edit({id, name, districtId}: EditWardDto){
      const BDSData = {
        id, name, districtId
      };
      const instance = await this.WardRepository.findBy({ id: id });
      if(instance){
          Object.assign(instance[0], BDSData);
          return await this.WardRepository.save(instance[0]);
      } 
  }

  async delete(payload: {id: number}) {
    const instance = await this.WardRepository.findBy({ id: payload.id });
    if(instance){
      return await this.WardRepository.delete({ id: payload.id });
    }
  }
}