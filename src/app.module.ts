import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { HashtagController } from './hashtag/hashtag.controller';
import { PostController } from './post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { getConnectionOptions } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';
import { HashtagService } from './hashtag/hashtag.service';
import { LikeEntity } from './entities/like.entity';
import { RetweetEntity } from './entities/retweet.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserFollowerPivot } from './entities/userfollowerpivot.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          synchronize: true,
          retryAttempts: 5,
        }),
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      PostEntity,
      LikeEntity,
      RetweetEntity,
      UserFollowerPivot
      
    ]),
    AuthModule,
    {
      ...JwtModule.register({
        secret: 'secret',
      }),
      global: true,
    },
  ],
  controllers: [
    AppController,
    UserController,
    HashtagController,
    PostController,
  ],
  providers: [AppService, UserService, PostService, HashtagService],
  exports: [UserService],
})
export class AppModule {}
