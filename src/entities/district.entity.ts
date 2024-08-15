import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ListingEntity from "./listing.entity";
import RegionEntity from "./region.entity";
import WardEntity from "./ward.entity";

@Entity({ name: 'district' })
export default class DistrictEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar'
  })
  name: string;

  @OneToMany(() => WardEntity, ward => ward.district)
  ward: WardEntity[]

}