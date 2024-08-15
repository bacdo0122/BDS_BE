import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import NewsEntity from "./new.entity";

@Entity({ name: 'newCategory' })
export default class NewCategoryrEntity {
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

  @OneToMany(() => NewsEntity, news => news.category)
  news: NewsEntity[]
}