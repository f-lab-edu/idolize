import { Expose } from 'class-transformer';

export interface IBaseResponseDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class BaseResponseDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
