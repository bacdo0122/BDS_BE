import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ListingEntity from "./listing.entity";
import RegionEntity from "./region.entity";
import DistrictEntity from "./district.entity";

@Entity({ name: 'ward' })
export default class WardEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar'
  })
  name: string;

  @Column({
    type: 'int'
  })
  districtId: number;

  @ManyToOne(() => DistrictEntity, district => district.ward)
  @JoinColumn({
    name: 'districtId'
  })
  district: DistrictEntity

  @OneToMany(() => RegionEntity, region => region.ward)
  region: RegionEntity[]


}