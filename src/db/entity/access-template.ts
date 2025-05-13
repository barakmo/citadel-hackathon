import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Permission } from './permission';
import { CommonKeyFields } from './common-key-fields';

@Entity()
export class AccessTemplate extends CommonKeyFields{

  @Column()
  name:string;

  @ManyToMany((type)=> Permission)
  @JoinTable({
    name: "template_permissions", // table name for the junction table of this relation
    joinColumn: {
      name: "templateId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "permissionId",
      referencedColumnName: "id"
    }
  })
  permissions: Permission[];
}