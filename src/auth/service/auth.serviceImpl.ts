import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthServiceImpl implements AuthServiceImpl {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signUp() {
    return {} as any;
  }
}
