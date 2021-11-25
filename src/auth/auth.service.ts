import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/createUser.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (user && (await compare(password, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async signup(userDto: CreateUserDto) {
    const salt = await genSalt(10);
    userDto.password = await hash(userDto.password,salt);
    await this.userRepo.save(userDto);
  }


  async signin(userLogin: LoginDto) {
   const payload = { id: userLogin.id };
    return {
      access_token: this.jwtService.sign(payload),
    };

  }

}
