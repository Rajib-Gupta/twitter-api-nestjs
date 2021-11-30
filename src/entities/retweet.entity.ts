import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Entity('retweets')
export class RetweetEntity extends BaseEntity {
    @Column({ nullable: false, type:'uuid' })
    userId: string;
  
    @Column({ nullable: false, type:'uuid'})
    postId: string;
  
    @JoinColumn()
    @ManyToOne(() => PostEntity, (retweet) => retweet.posts)
    post: PostEntity;
    
    @JoinColumn()
    @OneToOne(()=>UserEntity)
    user:UserEntity
}
