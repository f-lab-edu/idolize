import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionServiceImpl {
  constructor(private readonly configService: ConfigService) {}

  async hash(password: string): Promise<string> {
    const saltRound = this.configService.get<string>('SALTROUND');
    if (!saltRound || isNaN(parseInt(saltRound, 10))) {
      throw new Error('SALTRound가 정의되지 않았습니다.');
    }

    return await bcrypt.hash(password, parseInt(saltRound, 10));
  }
}
