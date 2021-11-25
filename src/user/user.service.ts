import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { PostEntity } from 'src/entities/post.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
  ) {}

  async findOne(username: string) {
    return await this.userRepo.findOne({where:{username}});
  }

  // create user
  createUser(createUser: CreateUserDto) {
    return this.userRepo.save(createUser);
  }

  //getuser by id
  async getUserById(id: string) {
    try {
      return await this.userRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  // delete user

  async deleteUserById(id: string) {
    try {
      return await this.userRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }

  // get all user
  getAllUser(){
    return this.userRepo.findAndCount()
  }

  //update user by id

  updateUser(id:string , updateUser:CreateUserDto){
   return this.userRepo.update(id,updateUser)
  }
}
