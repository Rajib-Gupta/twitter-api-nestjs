import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/followees')
  @UseGuards(JwtAuthGuard)
  getAllfollowees(){
    return this.userService.getAllfollowees()
  }

  @Get('/followers')
  @UseGuards(JwtAuthGuard)
  getAllfollowers(@Request() req){
    return this.userService.getAllfollowers(req.user.userId)
  }

  // get all users
  @Get('/all')
  @UseGuards(JwtAuthGuard)
  getAllUser() {
    return this.userService.getAllUser();
  }

  // get user details by id
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getUserDetailsById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  //delete user by id
  @Delete('/:userid')
  @UseGuards(JwtAuthGuard)
  deletedUser(@Param('userid') userid: string) {
    return this.userService.deleteUserById(userid);
  }
  // get user by id
  @Put('/:userid')
  @UseGuards(JwtAuthGuard)
  updatedUser(
    @Param('userid') userid: string,
    @Body() updateUser: CreateUserDto,
  ) {
    return this.userService.updateUser(userid, updateUser);
  }

  @Post('follow/:followeeId')
  @UseGuards(JwtAuthGuard)
  followUser(@Param('followeeId') followeeId,@Request() req){
    const followerId=req.user.userId
    return this.userService.followUser(followerId,followeeId)
  }

 
}
