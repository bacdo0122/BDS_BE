import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./users.entity";
import NewCategoryrEntity from "./newCategory.entity";

@Entity({ name: 'news' })
export default class NewsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar'
  })
  title: string;

  @Column({
    type: 'text'
  })
  content: string;

  @Column({
    type: 'int'
  })
  userId: number;

  @ManyToOne(() => UserEntity, user => user.news)
  @JoinColumn({
    name: "userId"
  })
  user: UserEntity

  @Column({
    type: 'int'
  })
  category_id: number;

  @ManyToOne(() => NewCategoryrEntity, cate => cate.news)
  @JoinColumn({
    name: "category_id"
  })
  category: NewCategoryrEntity

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

}