import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude({ toClassOnly: true })
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
}
