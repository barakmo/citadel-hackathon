import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission';
import { CommonKeyFields } from './common-key-fields';
import { Resource } from './resource';

@Entity()
export class Application extends CommonKeyFields {
  @Column()
  name:string;
  @OneToMany(() =>Permission, (permission) => permission.app)
  permissions: Permission[];
  @OneToMany(() => Resource, (resource) => resource.app)
  resources: Resource[];
}
