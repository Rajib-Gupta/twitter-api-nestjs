import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDto } from 'src/dto/createPost.dto';
import { LikeDto } from 'src/dto/likePost.dto';
import { RetweetDto } from 'src/dto/retweetPost.dto';
import { LikeEntity } from 'src/entities/like.entity';
import { PostEntity } from 'src/entities/post.entity';
import { RetweetEntity } from 'src/entities/retweet.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,
    @InjectRepository(RetweetEntity)
    private readonly retweetRepo: Repository<RetweetEntity>,
  ) {}

  async createPost(createPost: PostDto) {
    return await this.postRepo.save(createPost);
  }

  async getAllPosts() {
    return await this.postRepo.findAndCount();
  }

  async getPostById(id: string) {
    return await this.postRepo.findOne({ where: { id } });
  }
  async updatePost(id: string, createPost: PostDto) {
    return await this.postRepo.update(id, createPost);
  }
  async deletePost(id: string) {
    return await this.postRepo.delete(id);
  }

  // post like

  async likePost(createLike: LikeDto) {
    console.log(createLike);
    return this.likeRepo.save(createLike);
  }
// get all likes

  async getAllLike() {
    return this.likeRepo.findAndCount({ relations: ['post', 'user'] });
  }

  // retweet post

  async retweetPost(createRetweet:RetweetDto){
    return await this.retweetRepo.save(createRetweet)
  }

  // get all retweets
  async getAllRetweet(){
    return this.retweetRepo.findAndCount({relations:['post','user']})
  }
}
