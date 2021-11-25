import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Entity('likes')
export class LikeEntity extends BaseEntity {
  @Column({ nullable: false, type:'uuid', unique: true })
  userId: string;

  @Column({ nullable: false, type:'uuid', unique: true })
  postId: string;


  @JoinColumn()
  @ManyToOne(() => PostEntity, (like) => like.posts)
  post: PostEntity;
  
  @JoinColumn()
  @OneToOne(()=>UserEntity)
  user:UserEntity
}
