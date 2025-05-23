import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    console.log(signUpDto);

    return 'hello';
  }
}
