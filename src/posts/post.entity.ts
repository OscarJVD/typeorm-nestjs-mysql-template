import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity({ name: "posts" })
export class Post {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  authorId: number // optional - is only for save id too

  @ManyToOne(() => User, user => user.posts)
  author: User

}