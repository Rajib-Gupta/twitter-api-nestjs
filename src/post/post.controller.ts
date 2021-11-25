import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PostDto } from 'src/dto/createPost.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,
    private readonly postService: PostService,
  ) {}

  @Get('/posts')
  @UseGuards(JwtAuthGuard)
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  @Get('/:id')
  async getPostDetails(@Param('id') id) {
    return await this.postService.getPostById(id);
  }

  @Post('/create-post/:id')
  @UseGuards(JwtAuthGuard)
  async createNewPost(@Param('id') id, @Request() req) {
    const user = this.user.findOne({ where: { id } });
    if (user) {
      return this.postService.createPost({ ...req.body, user: id });
    }
    throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
  }

  @Put('/update-post/:id')
  @UseGuards(JwtAuthGuard)
  async updatePost(@Param('id') id,@Request() req){
    return await this.postService.updatePost(id,req.Body)
  }

  @Delete('/:postid')
  @UseGuards(JwtAuthGuard)
  async deletePostById(@Param("postid") id) {
    return await this.postService.deletePost(id)
  }

  @Delete('/:postid/like')
  unlikePost(@Param() param): string {
    return `deleted post ${param.postid}`;
  }

  @Post('/like/:postid')
  @UseGuards(JwtAuthGuard)
  async likePost(@Param("postid") postId ,@Request() req) {
    const userId= req.user.userId
    //console.log(userId,req.user,req.auth)
      return this.postService.likePost({userId,postId})
    }
  
    @Get('/like/posts')
    @UseGuards(JwtAuthGuard)
    async getAllLikes(){
      return this.postService.getAllLike()
    }
}
