import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { role_user } from "../enum/enum_common";
import ListingEntity from "./listing.entity";

@Entity({ name: 'listingCategory' })
export default class ListingCategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar'
  })
  name: string;

  @Column({
    type: 'varchar'
  })
  description: string;

  @OneToMany(() => ListingEntity, listing => listing.category)
  listings: ListingEntity[]

}