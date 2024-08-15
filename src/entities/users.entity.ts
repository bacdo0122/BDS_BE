import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { role_user } from "../enum/enum_common";
import ListingEntity from "./listing.entity";
import NewsEntity from "./new.entity";

@Entity({ name: 'user' })
export default class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar'
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: role_user,
    name: 'role',
    default: role_user.user,
  })
  role: role_user;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({nullable: true})
  avatar: string;

  @OneToMany(() => ListingEntity, listing => listing.user)
  listing: ListingEntity[]

  @OneToMany(() => NewsEntity, news => news.user)
  news: NewsEntity[]

}