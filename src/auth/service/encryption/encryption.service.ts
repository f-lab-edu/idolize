import { Provider } from '@nestjs/common';
import { EncryptionServiceImpl } from './encryption.serviceImpl';

export interface EncryptionService {
  hash: (password: string) => Promise<string>;
}

export const EncryptionServiceToken = Symbol('EncryptionService');
export const EncryptionServiceProvider: Provider<EncryptionService> = {
  provide: EncryptionServiceToken,
  useClass: EncryptionServiceImpl,
};
