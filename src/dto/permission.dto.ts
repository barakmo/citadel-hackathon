import { Permission } from '../db/entity/permission';
import { Application } from '../db/entity/application';
import { GrantFlow } from '../db/entity/grant-flow';
import { Resource } from '../db/entity/resource';

export class PermissionDto{
  id: number;
  technicalId: string;
  name: string;
  appId: number;
  grantFlowId: number;
  resourceId: number;

  static fromPermission(permission: Permission): PermissionDto {
    const res: PermissionDto = new PermissionDto();
    res.id = permission.id;
    res.technicalId = permission.technicalId;
    res.name = permission.name;
    res.appId = permission.app ? permission.app.id : null;
    res.grantFlowId = permission.grantFlow ? permission.grantFlow.id : null;
    res.resourceId = permission.resource ? permission.resource.id : null;
    return res;
  }

  static toPermission(dto: PermissionDto): Permission {
    const permission = new Permission();
    permission.id = dto.id;
    permission.technicalId = dto.technicalId;
    permission.name = dto.name;

    if (dto.appId) {
      const app = new Application();
      app.id = dto.appId;
      permission.app = app;
    }

    if (dto.grantFlowId) {
      const grantFlow = new GrantFlow();
      grantFlow.id = dto.grantFlowId;
      permission.grantFlow = grantFlow;
    }

    if (dto.resourceId) {
      const resource = new Resource();
      resource.id = dto.resourceId;
      permission.resource = resource;
    }

    return permission;
  }
}
