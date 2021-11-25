import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDto } from 'src/dto/createPost.dto';
import { LikeDto } from 'src/dto/likePost.dto';
import { LikeEntity } from 'src/entities/like.entity';
import { PostEntity } from 'src/entities/post.entity';
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
    private readonly likeRepo:Repository<LikeEntity>
  ) {}

  async createPost(createPost: PostDto) {
    return await this.postRepo.save(createPost);
  }

  async getAllPosts(){
      return await this.postRepo.findAndCount()
  }

  async getPostById(id:string){
      return await this.postRepo.findOne({where:{id}})
  }
async updatePost(id:string, createPost:PostDto){
    return await this.postRepo.update(id,createPost)
}
  async deletePost(id:string){
      return await this.postRepo.delete(id)
  }

  // post like 

  async likePost(createLike:LikeDto){
    console.log(createLike)
      return this.likeRepo.save(createLike)
  }

  async getAllLike(){
return this.likeRepo.findAndCount({relations:["post","user"]})
  }
}
