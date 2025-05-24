import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService, AuthServiceToken } from './service/auth/auth.service';
import { UserMapper } from '../user/dto/user.mapper';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthServiceToken)
    private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);

    return UserMapper.toResponseDto(user);
  }
}
