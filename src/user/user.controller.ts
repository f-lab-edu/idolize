import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from '../auth/dto/signup.dto';
import { UserMapper } from './dto/user.mapper';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: SignUpDto) {
    const newUser = await this.userService.create(dto);
    return UserMapper.toResponseDto(newUser);
  }
}
