import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../user/user.entity';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { CreateUserDto } from '../../user/interface/create.interface';

const passwordRegex =
  /^(?:(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*?_])|(?=.*\d)(?=.*[!@#$%^&*?_]))[A-Za-z\d!@#$%^&*?_]{8,20}$/;

const nameRegex = /^[a-zA-Z0-9]{1,255}/;

export class SignUpDto
  extends PickType(UserEntity, ['email', 'name', 'password'] as const)
  implements CreateUserDto
{
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email: string;

  @IsString()
  @Matches(RegExp(nameRegex), {
    message:
      '닉네임은 공백,특수문자를 제외한 숫자,문자 조합 (1~20자)조건을 만족해야합니다.',
  })
  name: string;

  @IsString()
  @Matches(RegExp(passwordRegex), {
    message:
      '비밀번호는 영문/숫자/특수문자 2가지 이상 조합 (8~20자) 조건을 만족해야 합니다.',
  })
  password: string;
}
