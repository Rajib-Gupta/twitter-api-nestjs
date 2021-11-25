import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
}
