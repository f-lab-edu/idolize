import { Column, Entity } from 'typeorm';
import { TRole } from './types';
import { IBaseEntity, MyBaseEntity } from '../common/entity/base';

export interface IUserEntity extends IBaseEntity {
  email: string;
  name: string;
  password: string;
  role?: TRole;
}

@Entity({ name: 'user' })
export class UserEntity extends MyBaseEntity implements IUserEntity {
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 10, default: 'buyer' })
  role: TRole = 'buyer';

  static from(param: IUserEntity) {
    const newUser = new UserEntity();
    const { createdAt, id, updatedAt, email, name, password, role } = param;
    newUser.id = id;
    newUser.createdAt = createdAt;
    newUser.updatedAt = updatedAt;

    newUser.email = email;
    newUser.name = name;
    newUser.password = password;
    newUser.role = role ?? 'buyer';

    return newUser;
  }
}
