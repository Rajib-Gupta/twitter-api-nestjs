import { BaseEntity } from 'src/common/base.entity';
import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { LikeEntity } from './like.entity';
import { RetweetEntity } from './retweet.entity';
import { UserEntity } from './user.entity';

@Entity('user_follower_following_pivot')
export class UserFollowerPivot extends BaseEntity {
  @Column({ nullable: false, type: 'uuid' })
  followerId: string;
  
  @Column({ nullable: false, type: 'uuid' })
  followeeId: string;
  
  @ManyToOne(() => UserEntity, user => user.followers)
  follower: UserEntity;


  @ManyToOne(() => UserEntity, user => user.followees)
  followee: UserEntity;
}
