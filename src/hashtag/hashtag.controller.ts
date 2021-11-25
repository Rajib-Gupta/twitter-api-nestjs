import { Controller, Get, Param } from '@nestjs/common';

@Controller('hashtag')
export class HashtagController {

    @Get()
    getHashTags():string{
      return 'all top hash tags'
    }

    @Get('/:tag/posts')
    getPostsForHashtags(@Param() tag){
      return `show all posts by ${tag} `
    }

}
