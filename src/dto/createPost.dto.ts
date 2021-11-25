import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  title: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  description: string;

  @ApiProperty()
  @IsString()
 @IsOptional()
  images: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsOptional()
  hashtag: string;

}
