import { Column, Entity, ManyToOne } from 'typeorm';
import { Permission } from './permission';
import { CommonKeyFields } from './common-key-fields';
import { User } from './user';

export enum FlowStatus {
  ACTIVE = 'active',
  APPROVED = 'approved',
  DENIED = 'denied'
}
@Entity()
export class ActiveFlow extends CommonKeyFields {

  @Column()
  flowId: string;

  @Column({
    enum: FlowStatus,
    default: FlowStatus.ACTIVE
  })
  flowStatus: FlowStatus;

  @ManyToOne(() => User, (user) => user.activeFlows)
  user: User;

  @ManyToOne(() => Permission, (permission) => permission.activeFlows)
  permission: Permission;

}