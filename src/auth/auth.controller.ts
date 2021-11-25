import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // new user signup
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }

  // existing user signin
  @Post('signin')
  @UseGuards(LocalAuthGuard)
  signin(@Request() req) {
    return this.authService.signin(req.user);
  }
}
