
import { IsDefined, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base.entity';

export class LoginDto extends BaseEntity{

  @IsString()
  @IsDefined()
  username: string;

  @IsString()
  @IsDefined()
  password:string;



  
}
