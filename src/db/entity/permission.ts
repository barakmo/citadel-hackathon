import { Column, Entity, ManyToOne } from 'typeorm';
import { GrantFlow } from './grant-flow';
import { Application } from './application';
import { CommonKeyFields } from './common-key-fields';
import { Resource } from './resource';

@Entity()
export class Permission extends CommonKeyFields{
  @Column()
  technicalId:string;
  @Column()
  name: string;
  @ManyToOne(() =>Application, (application) => application.permissions)
  app: Application;
  @ManyToOne(() =>GrantFlow, (grant) => grant.permissions)
  grantFlow: GrantFlow;
  @ManyToOne(() => Resource, (resource) => resource.permissions)
  resource: Resource;
}
