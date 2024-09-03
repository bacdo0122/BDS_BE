import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Like, Repository } from "typeorm";
import { Exsisted } from "../../expections/Exsited.expection";
import { GetListingDto } from "./dtos/getListing.dto";
import { CreateListingDto } from "./dtos/createRegion.dto";
import ListingEntity from "../../entities/listing.entity";
import { TypeListingService } from "../typeListing/typeListing.service";
import { ListingCategoryService } from "../categoryListing/categoryListing.service";
import { EditListingDto } from "./dtos/editListing.dto";
import { DeleteListingDto } from "./dtos/deleteListing.dto";
import { GetOneListingDto } from "./dtos/getOneListing.dto";
import { ConfirmListingDto } from "./dtos/confirmListing.dto";

@Injectable()
export class ListingService{
    constructor(
        @InjectRepository(ListingEntity)
    private ListingRepository: Repository<ListingEntity>,
    private listingTypeService: TypeListingService,
    private listingCategoryService: ListingCategoryService,
    ){}

    async find({search, page, limit,  userId, price, status, regionId, title, description, address, area, legal_status, type_id,
      bedrooms, bathrooms, furnishing, orientation} : GetListingDto){
        let searchOption = [];
     if(search){
        searchOption = [{ title: Like(`%${search.trim()}%`) }];
     }
     let andOption: any = {};
    if (userId) {
        andOption.userId = userId;
    }
    if(price){
        andOption.price = LessThan(price);
    }
    if(status){
        andOption.status = status;
    }
    if(type_id){
      andOption.type_id = type_id;
  }
    if (Object.keys(andOption).length > 0) {
        searchOption.push(andOption);
      }
    const [data, total] = await this.ListingRepository.findAndCount({
        where: searchOption.length > 0 ? searchOption : {},
        order: {id: "ASC"},
        take: limit,
        skip: (page - 1) * limit,
        relations: ['user', 'category', 'type','region', 'region.ward', 'region.ward.district', 'direction']
      });

      return {
        data,
        total,
        currentPage: page,
        totalPage: Math.ceil(total / limit),
      };
    }

    async findOne({id}:GetOneListingDto){
      return await this.ListingRepository.findOne({where: {id}, relations: ['user', 'category', 'type','region', 'region.ward', 'region.ward.district']})
    }

    async create(payload: CreateListingDto){
        const {
           userId, price, status, category_id, type_id, regionId, title, description, address, area, legal_status,
           bedrooms, bathrooms, furnishing, orientation, image, pricePerArea, direction_id
          } = payload;
          const checkExsi  = await this.ListingRepository.find({where: {title}});
          if(checkExsi.length){
            throw new Exsisted()
          } else{

            let newListing = this.ListingRepository.create({
              status, regionId, title, description, address, area, legal_status,
              bedrooms, bathrooms, furnishing, orientation,userId,price, category_id, type_id,image,  pricePerArea, direction_id
            });
            return await this.ListingRepository.save(newListing);
          }
    }

    async edit(payload: EditListingDto){
        const {
            id, price,  category_id, type_id ,status, regionId, title, description, address, area, legal_status,
            bedrooms, bathrooms, furnishing, orientation,userId, image,  pricePerArea, direction_id
           } = payload;
        const filmData = { 
            userId,  status, regionId, title, description, address, area, legal_status,
            bedrooms, bathrooms, furnishing, orientation, price,  category_id, type_id, image,  pricePerArea, direction_id
          };
      
          const instance = await this.ListingRepository.findBy({ id: id });
          Object.assign(instance[0], filmData);
          return await this.ListingRepository.save(instance[0]);
    }

    async confirm(payload: ConfirmListingDto){
      const {
        status,id
       } = payload;
    const filmData = { 
      status,id
      };
  
      const instance = await this.ListingRepository.findBy({ id: id });
      Object.assign(instance[0], filmData); 
      return await this.ListingRepository.save(instance[0]);
    } 

    async delete(payload: DeleteListingDto) {
        const instance = await this.ListingRepository.findBy({ id: payload.id });
        return await this.ListingRepository.delete({ id: payload.id });
      }
}