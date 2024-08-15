import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import RegionEntity from "../../entities/region.entity";
import { Like, Repository } from "typeorm";
import { GetRegionDto } from "./dtos/getRegion.dto";
import { CreateRegionDto } from "./dtos/createRegion.dto";
import { Exsisted } from "../../expections/Exsited.expection";
import { EditRegionDto } from "./dtos/editRegion.dto";

@Injectable()
export class RegionService{
    constructor(
        @InjectRepository(RegionEntity)
    private RegionRepository: Repository<RegionEntity>,
    ){}

    async find({search, page, limit,  name, wardId} : GetRegionDto){
        let searchOption = [];
     if(search){
        searchOption = [{ name: Like(`%${search.trim()}%`) }, { wardId: Like(`%${search.trim()}%`) }];
     }
     let andOption: any = {};
    if (name) {
        andOption.name = name;
    }
    if (wardId) {
        andOption.wardId = wardId;
    }
    if (Object.keys(andOption).length > 0) {
        searchOption.push(andOption);
      }
    const [data, total] = await this.RegionRepository.findAndCount({
        where: searchOption.length > 0 ? searchOption : {},
        order: {id: "ASC"},
        take: limit,
        skip: (page - 1) * limit,
        relations: ['ward', 'listing', 'ward.district']
      });

      return {
        data,
        total,
        currentPage: page,
        totalPage: Math.ceil(total / limit),
      };
    }

    async create(payload: CreateRegionDto){
        const {
           name, wardId
          } = payload;
          const checkExistRegion = await this.RegionRepository.findOne({where: {name, wardId}})
          if(checkExistRegion){
           throw new Exsisted();
          }
        else{
            const newRegion = this.RegionRepository.create({
              name, wardId
            }) 
            this.RegionRepository.save(newRegion, {
                reload: false,
              });
        }
    }

    async edit({id,  name, wardId}: EditRegionDto){
        const BDSData = {
          id,  name, wardId
        };
        const instance = await this.RegionRepository.findBy({ id: id });
        if(instance){
            Object.assign(instance[0], BDSData);
            return await this.RegionRepository.save(instance[0]);
        } 
    }
  
    async delete(payload: {id: number}) {
      const instance = await this.RegionRepository.findBy({ id: payload.id });
      if(instance){
        return await this.RegionRepository.delete({ id: payload.id });
      }
    }
}