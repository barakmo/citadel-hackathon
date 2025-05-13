import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission';
import { CommonKeyFields } from './common-key-fields';

@Entity()
export class GrantFlow extends CommonKeyFields{
  @Column()
  name:string;
  @Column()
  flowId:string;
  @OneToMany(() =>Permission, (permission) => permission.grantFlow)
  permissions: Permission[];
}