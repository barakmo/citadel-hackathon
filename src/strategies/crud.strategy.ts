import { Strategy } from './base.strategy';
import { BaseEntity } from 'typeorm';

export interface CrudStrategy extends Strategy {

  create: <T extends BaseEntity>(entity: T) => Promise<T>;
  read:   <T extends BaseEntity>(entity: T) => Promise<T>;
  readWithRelations: <T extends BaseEntity>(entityName: string, criteria: object, relations: string[]) => Promise<T>;
  readAllWithRelations: <T extends BaseEntity>(entityName: string, criteria: object, relations: string[]) => Promise<T[]>;
  update: <T extends BaseEntity>(entity: T) => Promise<T>;
  delete: <T extends BaseEntity>(entity: T) => Promise<boolean>;

}
