import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CrudStrategy } from '../../strategies/crud.strategy';
import { PermissionDto } from '../../dto/permission.dto';
import { Permission } from '../../db/entity/permission';

@Injectable()
export class PermissionService {
  constructor(
    @Inject('CRUD_PROVIDER')
    private crud: CrudStrategy,
  ) {}

  async createPermission(dto: PermissionDto): Promise<PermissionDto> {
    const newPermission = PermissionDto.toPermission(dto);
    newPermission.id = null;
    const permission = await this.crud.create<Permission>(newPermission);
    if (!permission) {
      throw new NotFoundException('Permission not Created');
    }
    return PermissionDto.fromPermission(permission);
  }

  async readPermission(id: number): Promise<PermissionDto> {
    const search = new Permission();
    search.id = id;
    const permission = await this.crud.read<Permission>(search);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return PermissionDto.fromPermission(permission);
  }

  async updatePermission(dto: PermissionDto): Promise<PermissionDto> {
    const permission = await this.crud.update<Permission>(PermissionDto.toPermission(dto));
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return PermissionDto.fromPermission(permission);
  }

  async deletePermission(id: number): Promise<void> {
    const search = new Permission();
    search.id = id;
    const permission = await this.crud.read<Permission>(search);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    await this.crud.delete<Permission>(permission);
  }

  async getPermissionsByResource(resourceId: number): Promise<PermissionDto[]> {
    const permissions = await this.crud.readAllWithRelations<Permission>(
      'Permission', 
      { resource: { id: resourceId } }, 
      ['app', 'resource', 'grantFlow']
    );

    if (!permissions || permissions.length === 0) {
      return [];
    }

    return permissions.map(permission => PermissionDto.fromPermission(permission));
  }

  async getPermissionsByApp(appId: number): Promise<PermissionDto[]> {
    const permissions = await this.crud.readAllWithRelations<Permission>(
      'Permission', 
      { app: { id: appId } }, 
      ['app', 'resource', 'grantFlow']
    );

    if (!permissions || permissions.length === 0) {
      return [];
    }

    return permissions.map(permission => PermissionDto.fromPermission(permission));
  }
}
