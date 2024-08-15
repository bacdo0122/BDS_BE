import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ListingEntity from "./listing.entity";
import DistrictEntity from "./district.entity";
import WardEntity from "./ward.entity";

@Entity({ name: 'region' })
export default class RegionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar'
  })
  name: string;

  @Column({
    type: 'int'
  })
  wardId: number;

  @ManyToOne(() => WardEntity, ward => ward.region)
  @JoinColumn({
    name: 'wardId'
  })
  ward: WardEntity

  @OneToMany(() => ListingEntity, listing => listing.region)
  listing: ListingEntity[]

}