import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/base.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { UserFollowerPivot } from './userfollowerpivot.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  // @Exclude({ toClassOnl })
  password: string;

  @Column({ nullable: true })
  avtar: string;

  @Column({ nullable: true, length: 240 })
  bio: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => UserFollowerPivot, (pivot) => pivot.follower)
  followers: UserFollowerPivot[];

  @ManyToMany(() => UserFollowerPivot, (pivot) => pivot.followee)
  followees: UserFollowerPivot[];
}
