import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Exsisted } from "../../expections/Exsited.expection";
import DirectionEntity from "../../entities/direction.entity";
import { GetDirectionDto } from "./dtos/getDirection.dto";
import { CreateDirectionDto } from "./dtos/createDirection.dto";
import { EditDirectionDto } from "./dtos/editDirection.dto";




@Injectable()
export class DirectionService{
    constructor(
        @InjectRepository(DirectionEntity)
    private DirectionRepository: Repository<DirectionEntity>,
    ){}

    async find({search, page, limit, name } : GetDirectionDto){
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
    const [data, total] = await this.DirectionRepository.findAndCount({
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

    async create(payload: CreateDirectionDto){
        const {
           name
          } = payload;
          const checkExistNews = await this.DirectionRepository.findOne({where: {name}})
          if(checkExistNews){
           throw new Exsisted();
          }
        else{
            const newNews = this.DirectionRepository.create({
                name
            }) 
            this.DirectionRepository.save(newNews, {
                reload: false,
              });
        }
    }


    async edit({id, name}: EditDirectionDto){
      const BDSData = {
        id, name
      };
      const instance = await this.DirectionRepository.findBy({ id: id });
      if(instance){
          Object.assign(instance[0], BDSData);
          return await this.DirectionRepository.save(instance[0]);
      } 
  }

  async delete(payload: {id: number}) {
    const instance = await this.DirectionRepository.findBy({ id: payload.id });
    if(instance){
      return await this.DirectionRepository.delete({ id: payload.id });
    }
  }
}