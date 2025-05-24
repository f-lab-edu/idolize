import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMapper } from './dto/user.mapper';
import { CreateUserDto } from './interface/create.interface';

@Injectable()
export class UserServiceImpl {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const { email } = dto;
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException('유저가 이미 있습니다.');
    }

    const newUser = UserMapper.toEntity(dto);

    return await this.userRepository.save(newUser);
  }
}
