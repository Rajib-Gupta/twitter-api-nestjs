import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  username: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avtar: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio: string;
}
