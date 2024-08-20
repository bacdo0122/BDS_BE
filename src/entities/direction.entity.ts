import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ListingEntity from "./listing.entity";

@Entity({ name: 'direction' })
export default class DirectionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar'
  })
  name: string;

  @OneToMany(() => ListingEntity, listing => listing.direction)
  listings: ListingEntity[]

}