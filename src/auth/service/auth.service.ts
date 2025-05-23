import { Provider } from '@nestjs/common';
import { UserEntity } from '../../user/user.entity';
import { AuthServiceImpl } from './auth.serviceImpl';

export interface AuthService {
  signUp: () => Promise<UserEntity>;
}

export const AuthServiceToken = Symbol('AuthService');
export const AuthServiceProvider: Provider<AuthService> = {
  provide: AuthServiceToken,
  useClass: AuthServiceImpl,
};
