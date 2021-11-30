import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './stategies/jwt.stategy';
import { LocalStrategy } from './stategies/local.stategy';
import { AuthController } from './auth.controller';
import { UserFollowerPivot } from 'src/entities/userfollowerpivot.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,PostEntity,UserFollowerPivot]),PassportModule],
  providers: [AuthService,UserService,JwtStrategy,LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
