import { BaseEntity, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { AccessTemplate } from './access-template';
import { Permission } from './permission';
import { ActiveFlow } from './active-flows';

@Entity()
export class User extends BaseEntity{
  @PrimaryColumn({
    length:100
  })
  userId:string;

  @ManyToMany(()=> AccessTemplate)
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

  @ManyToMany(()=> Permission)
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

  @OneToMany(() => ActiveFlow, (activeFlow) => activeFlow.user)
  activeFlows: ActiveFlow[];
}