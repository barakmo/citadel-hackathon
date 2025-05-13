import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Application } from './application';
import { Permission } from './permission';
import { CommonKeyFields } from './common-key-fields';

@Entity()
export class Resource extends CommonKeyFields {
  @Column()
  name: string;

  @ManyToOne(() => Application, (application) => application.resources)
  app: Application;

  @OneToMany(() => Permission, (permission) => permission.resource)
  permissions: Permission[];
}