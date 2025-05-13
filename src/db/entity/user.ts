import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { AccessTemplate } from './access-template';
import { Permission } from './permission';
import { CommonKeyFields } from './common-key-fields';

@Entity()
export class User extends BaseEntity{
  @PrimaryColumn({
    length:100
  })
  userId:string;

  @ManyToMany((type)=> AccessTemplate)
  @JoinTable({
    name: "users_templates", // table name for the junction table of this relation
    joinColumn: {
      name: "userId",
      referencedColumnName: "userId"
    },
    inverseJoinColumn: {
      name: "templateId",
      referencedColumnName: "id"
    }
  })
  templates: AccessTemplate[];

  @ManyToMany((type)=> Permission)
  @JoinTable({
    name: "users_permissions", // table name for the junction table of this relation
    joinColumn: {
      name: "userId",
      referencedColumnName: "userId"
    },
    inverseJoinColumn: {
      name: "permissionId",
      referencedColumnName: "id"
    }
  })
  allowedPermissions: Permission[];
}