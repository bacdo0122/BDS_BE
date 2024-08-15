import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./users.entity";
import ListingCategoryEntity from "./listingCategory.entity";
import TypeListingEntity from "./listingType.entity";
import RegionEntity from "./region.entity";
import { status_bds } from "../enum/enum_common";

@Entity({ name: 'listing' })
export default class ListingEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int'
  })
  regionId: number;

  @ManyToOne(() => RegionEntity, region => region.listing)
  @JoinColumn({
    name: 'regionId'
  })
  region: RegionEntity

  @Column({
    type: 'varchar'
  })
  title: string;

  @Column({
    type: 'text'
  })
  description: string;

  @Column({
    type: 'varchar'
  })
  address: string;
  
  @Column({
    type: 'decimal'
  })
  area: number;

  @Column({
    type: 'enum',
    enum: status_bds,
    name: 'status',
    default: status_bds.pending,
  })
  status: status_bds;

  @Column({
    type: 'boolean'
  })
  legal_status: boolean;

  @Column({
    type: 'int'
  })
  bedrooms: number;

  @Column({
    type: 'int'
  })
  bathrooms: number;

  @Column({
    type: 'boolean'
  })
  furnishing: boolean;

  @Column({
    type: 'varchar'
  })
  orientation: string;

  @Column({
    type: 'int'
  })
  userId: number;

  @ManyToOne(() => UserEntity, user => user.listing)
  @JoinColumn({
    name: 'userId'
  })
  user: UserEntity

  @Column({
    type: 'decimal'
  })
  price: number;

  @Column({
    type: 'text',
  })
  image: string;

  @Column({
    type: 'timestamp'
  })
  expiration_date: Date


  @Column({
    type: 'int'
  })
  category_id: number;

  @ManyToOne(() => ListingCategoryEntity, cate => cate.listings)
  @JoinColumn({
    name: 'category_id'
  })
  category: ListingCategoryEntity;

  @Column({
    type: 'int'
  })
  type_id: number;

  @ManyToOne(() => TypeListingEntity, type => type.listings)
  @JoinColumn({
    name: 'type_id'
  })
  type: TypeListingEntity;

  
  @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @BeforeInsert()
  setDefaultExpirationDate() {
    if (!this.expiration_date) {
      const now = new Date();
      now.setFullYear(now.getFullYear() + 1); // Cộng thêm 1 năm
      this.expiration_date = now;
    }
  }
}