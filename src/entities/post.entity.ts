import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { LikeEntity } from './like.entity';
import { RetweetEntity } from './retweet.entity';
import { UserEntity } from './user.entity';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @Column({ nullable: false, unique: true })
  title: string;

  @Column({length:140})
  description:string

  @Column({nullable:true})
  images: string;

  @Column({nullable:true})
  hashtag: string;

  @Column({ name: 'like_count' ,nullable:true})
  likeCount: string;

  @Column({ nullable: true, default: 0 })
  retweetCount: number;

  @Column({ default: false })
  isEdited: boolean;

  // @JoinColumn()
  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;
 
  
  @OneToMany(() => LikeEntity, (like) => like.post)
  posts: PostEntity[];
  
  @OneToMany(() => RetweetEntity, (retweet) => retweet.post)
  post: RetweetEntity[];
}
