import { CrudStrategy } from './crud.strategy';
import { ModuleRef } from '@nestjs/core';
import { BaseEntity, DataSource, Repository } from 'typeorm';
import { AccessTemplate } from '../db/entity/access-template';
import { Application } from '../db/entity/application';
import { GrantFlow } from '../db/entity/grant-flow';
import { Permission } from '../db/entity/permission';
import { User } from '../db/entity/user';
import { Resource } from '../db/entity/resource';

export class TypeormStrategy implements CrudStrategy {

  create = async <T extends BaseEntity>(entity: T): Promise<T> => {
    return await entity.save();
  };

  delete = async <T extends BaseEntity>(entity: T): Promise<boolean> => {
    const res = await entity.remove();
    return !res.hasId();
  };

  read = async <T extends BaseEntity>(entity: T): Promise<T> => {
    switch (true) {
      case entity instanceof AccessTemplate:
        return (await AccessTemplate.findOneBy({
          id: entity.id,
        })) as unknown as T;

      case entity instanceof Application:
        return (await Application.findOneBy({
          id: entity.id,
        })) as unknown as T;

      case entity instanceof GrantFlow:
        return (await GrantFlow.findOneBy({
          id: entity.id,
        })) as unknown as T;

      case entity instanceof Permission:
        return (await Permission.findOneBy({
          id: entity.id,
        })) as unknown as T;

      case entity instanceof User:
        return (await User.findOneBy({
          userId: entity.userId,
        })) as unknown as T;
    }
  };

  update = async <T extends BaseEntity>(entity: T): Promise<T> => {
    return await entity.save();
  };

  readWithRelations = async <T extends BaseEntity>(entityName: string, criteria: object, relations: string[]): Promise<T> => {
    switch (entityName) {
      case 'User':
        return (await User.findOne({
          where: criteria,
          relations: relations
        })) as unknown as T;
      case 'Permission':
        return (await Permission.findOne({
          where: criteria,
          relations: relations
        })) as unknown as T;
      case 'AccessTemplate':
        return (await AccessTemplate.findOne({
          where: criteria,
          relations: relations
        })) as unknown as T;
      case 'Application':
        return (await Application.findOne({
          where: criteria,
          relations: relations
        })) as unknown as T;
      case 'GrantFlow':
        return (await GrantFlow.findOne({
          where: criteria,
          relations: relations
        })) as unknown as T;
      default:
        throw new Error(`Entity ${entityName} not supported`);
    }
  };

  readAllWithRelations = async <T extends BaseEntity>(entityName: string, criteria: object, relations: string[]): Promise<T[]> => {
    switch (entityName) {
      case 'User':
        return (await User.find({
          where: criteria,
          relations: relations
        })) as unknown as T[];
      case 'Permission':
        return (await Permission.find({
          where: criteria,
          relations: relations
        })) as unknown as T[];
      case 'AccessTemplate':
        return (await AccessTemplate.find({
          where: criteria,
          relations: relations
        })) as unknown as T[];
      case 'Application':
        return (await Application.find({
          where: criteria,
          relations: relations
        })) as unknown as T[];
      case 'GrantFlow':
        return (await GrantFlow.find({
          where: criteria,
          relations: relations
        })) as unknown as T[];
      case 'Resource':
        return (await Resource.find({
          where: criteria,
          relations: relations
        })) as unknown as T[];
      default:
        throw new Error(`Entity ${entityName} not supported`);
    }
  };
}
