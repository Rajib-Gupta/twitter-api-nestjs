import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('retweets')
export class RetweetEntity extends BaseEntity {
    @Column({ nullable: false, type:'uuid', unique: true })
    userId: string;
  
    @Column({ nullable: false, type:'uuid', unique: true })
    retweetId: string;
  
    @JoinColumn()
  @ManyToOne(() => PostEntity, (retweet) => retweet.posts)
  post: PostEntity;
}
