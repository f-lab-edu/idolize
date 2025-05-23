import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from '../auth/dto/signup.dto';
import { UserMapper } from './dto/user.mapper';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  async create(dto: SignUpDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException('유저가 이미 있습니다.');
    }

    if (email === password) {
      throw new BadRequestException('비밀번호는 이메일과 같을 수 없습니다.');
    }

    const saltRound = this.configService.get<string>('SALTROUND');
    if (!saltRound || isNaN(parseInt(saltRound, 10))) {
      throw new Error('SALTRound가 정의되지 않았습니다.');
    }

    const hashed = await bcrypt.hash(password, parseInt(saltRound, 10));
    const dtoWithHashedPassword: Omit<UserEntity, 'role'> = {
      ...dto,
      password: hashed,
    };
    const newUser = UserMapper.toEntity(dtoWithHashedPassword);

    return await this.userRepository.save(newUser);
  }
}
