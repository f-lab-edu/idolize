import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create() {
    const data: Pick<User, 'email' | 'name' | 'password'> = {
      email: 'test@gmail.com',
      password: '1234',
      name: 'test',
    };
    return this.userRepository.create(data);
  }
}
