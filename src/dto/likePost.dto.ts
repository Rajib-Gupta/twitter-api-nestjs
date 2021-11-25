import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class LikeDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  postId: string;
}
