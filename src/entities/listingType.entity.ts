import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ListingEntity from "./listing.entity";

@Entity({ name: 'listingType' })
export default class TypeListingEntity {
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

  @OneToMany(() => ListingEntity, listing => listing.type)
  listings: ListingEntity[]
}