import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CrudStrategy } from '../../strategies/crud.strategy';
import { User } from '../../db/entity/user';
import { Permission } from '../../db/entity/permission';
import { AccessTemplate } from '../../db/entity/access-template';
import { GrantFlow } from '../../db/entity/grant-flow';
import { Application } from '../../db/entity/application';
import { UserDto } from '../../dto/user.dto';
import { PermissionDto } from '../../dto/permission.dto';
import { ResourcePermissionsDto } from '../../dto/resource-permissions.dto';
import { AccessTemplateDto } from '../../dto/access-template.dto';

@Injectable()
export class UserPermissionService {
  constructor(
    @Inject('CRUD_PROVIDER')
    private crud: CrudStrategy,
  ) {}

  // User Permission Management
  async assignPermissionToUser(userId: string, permissionId: number, appId: number): Promise<void> {
    const user = await this.getUserWithPermissions(userId);
    const permission = await this.getPermissionById(permissionId);

    // Verify permission belongs to the specified app
    if (permission.app.id !== appId) {
      throw new NotFoundException('Permission not found in the specified application');
    }

    // Check if user already has this permission
    const hasPermission = user.allowedPermissions.some(p => p.id === permissionId);
    if (!hasPermission) {
      user.allowedPermissions.push(permission);
      await this.crud.update<User>(user);
    }
  }

  async removePermissionFromUser(userId: string, permissionId: number, appId: number): Promise<void> {
    const user = await this.getUserWithPermissions(userId);
    const permission = await this.getPermissionById(permissionId);

    // Verify permission belongs to the specified app
    if (permission.app.id !== appId) {
      throw new NotFoundException('Permission not found in the specified application');
    }

    // Filter out the permission to remove
    user.allowedPermissions = user.allowedPermissions.filter(p => p.id !== permissionId);
    await this.crud.update<User>(user);
  }

  async getUserPermissions(userId: string, appId: number): Promise<PermissionDto[]> {
    const user = await this.getUserWithPermissions(userId);

    // Filter permissions by app ID
    const appPermissions = user.allowedPermissions.filter(p => p.app.id === appId);

    return appPermissions.map(permission => PermissionDto.fromPermission(permission));
  }

  async hasPermission(userId: string, permissionId: number, appId: number): Promise<boolean> {
    const user = await this.getUserWithPermissions(userId);

    // Check if user has the permission and it belongs to the specified app
    return user.allowedPermissions.some(p => p.id === permissionId && p.app.id === appId);
  }

  async getUserPermissionsByResource(userId: string, resourceId: number): Promise<PermissionDto[]> {
    const user = await this.getUserWithPermissions(userId);

    // Filter permissions by resource ID
    const resourcePermissions = user.allowedPermissions.filter(p => p.resource && p.resource.id === resourceId);

    return resourcePermissions.map(permission => PermissionDto.fromPermission(permission));
  }

  async getUserPermissionsGroupedByResource(userId: string): Promise<ResourcePermissionsDto[]> {
    const user = await this.getUserWithPermissions(userId);

    // Group permissions by resource
    const resourceMap = new Map<number, ResourcePermissionsDto>();

    for (const permission of user.allowedPermissions) {
      if (!permission.resource) continue;

      const resourceId = permission.resource.id;
      if (!resourceMap.has(resourceId)) {
        resourceMap.set(resourceId, {
          resourceId,
          resourceName: permission.resource.name,
          permissions: []
        });
      }

      resourceMap.get(resourceId).permissions.push(PermissionDto.fromPermission(permission));
    }

    return Array.from(resourceMap.values());
  }

  // Access Template Management
  async assignUserToTemplate(userId: string, templateId: number): Promise<void> {
    const user = await this.getUserWithTemplates(userId);
    const template = await this.getTemplateById(templateId);

    // Check if user already has this template
    const hasTemplate = user.templates.some(t => t.id === templateId);
    if (!hasTemplate) {
      user.templates.push(template);
      await this.crud.update<User>(user);
    }
  }

  async removeUserFromTemplate(userId: string, templateId: number): Promise<void> {
    const user = await this.getUserWithTemplates(userId);

    // Filter out the template to remove
    user.templates = user.templates.filter(t => t.id !== templateId);
    await this.crud.update<User>(user);
  }

  async assignPermissionToTemplate(templateId: number, permissionId: number, appId: number): Promise<void> {
    const template = await this.getTemplateWithPermissions(templateId);
    const permission = await this.getPermissionById(permissionId);

    // Verify permission belongs to the specified app
    if (permission.app.id !== appId) {
      throw new NotFoundException('Permission not found in the specified application');
    }

    // Check if template already has this permission
    const hasPermission = template.permissions.some(p => p.id === permissionId);
    if (!hasPermission) {
      template.permissions.push(permission);
      await this.crud.update<AccessTemplate>(template);
    }
  }

  async removePermissionFromTemplate(templateId: number, permissionId: number, appId: number): Promise<void> {
    const template = await this.getTemplateWithPermissions(templateId);
    const permission = await this.getPermissionById(permissionId);

    // Verify permission belongs to the specified app
    if (permission.app.id !== appId) {
      throw new NotFoundException('Permission not found in the specified application');
    }

    // Filter out the permission to remove
    template.permissions = template.permissions.filter(p => p.id !== permissionId);
    await this.crud.update<AccessTemplate>(template);
  }

  // Grant Flow Management
  async setGrantFlowForPermission(permissionId: number, grantFlowId: number, appId: number): Promise<void> {
    const permission = await this.getPermissionById(permissionId);
    const grantFlow = await this.getGrantFlowById(grantFlowId);

    // Verify permission belongs to the specified app
    if (permission.app.id !== appId) {
      throw new NotFoundException('Permission not found in the specified application');
    }

    permission.grantFlow = grantFlow;
    await this.crud.update<Permission>(permission);
  }

  // User Access Templates
  async getUserAccessTemplates(userId: string): Promise<AccessTemplateDto[]> {
    const user = await this.getUserWithTemplates(userId);
    return user.templates.map(template => AccessTemplateDto.fromAccessTemplate(template));
  }

  // Helper methods
  private async getUserWithPermissions(userId: string): Promise<User> {
    const user = await this.crud.readWithRelations<User>('User', { userId }, ['allowedPermissions', 'allowedPermissions.app', 'allowedPermissions.resource']);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async getUserWithTemplates(userId: string): Promise<User> {
    const user = await this.crud.readWithRelations<User>('User', { userId }, ['templates']);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async getPermissionById(permissionId: number): Promise<Permission> {
    const permission = await this.crud.readWithRelations<Permission>('Permission', { id: permissionId }, ['app', 'resource']);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  private async getTemplateById(templateId: number): Promise<AccessTemplate> {
    const template = await this.crud.read<AccessTemplate>({ id: templateId } as AccessTemplate);
    if (!template) {
      throw new NotFoundException('Access Template not found');
    }
    return template;
  }

  private async getTemplateWithPermissions(templateId: number): Promise<AccessTemplate> {
    const template = await this.crud.readWithRelations<AccessTemplate>('AccessTemplate', { id: templateId }, ['permissions', 'permissions.app', 'permissions.resource']);
    if (!template) {
      throw new NotFoundException('Access Template not found');
    }
    return template;
  }

  private async getGrantFlowById(grantFlowId: number): Promise<GrantFlow> {
    const grantFlow = await this.crud.read<GrantFlow>({ id: grantFlowId } as GrantFlow);
    if (!grantFlow) {
      throw new NotFoundException('Grant Flow not found');
    }
    return grantFlow;
  }
}
