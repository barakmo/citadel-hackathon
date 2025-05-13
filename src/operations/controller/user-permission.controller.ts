import { Body, Controller, Delete, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { UserPermissionService } from '../service/user-permission.service';
import { PermissionDto } from '../../dto/permission.dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResourcePermissionsDto } from '../../dto/resource-permissions.dto';
import { AccessTemplateDto } from '../../dto/access-template.dto';

@ApiTags('User Permissions')
@Controller('user-permissions')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  // User Permission Management
  @Post('user/:userId/permission/:permissionId/app/:appId')
  @ApiResponse({
    status: 200,
    description: 'Permission assigned to user successfully',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user',
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'permissionId',
    description: 'The ID of the permission',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'appId',
    description: 'The ID of the application',
    required: true,
    type: Number,
  })
  async assignPermissionToUser(
    @Param('userId') userId: string,
    @Param('permissionId') permissionId: number,
    @Param('appId') appId: number,
  ): Promise<void> {
    await this.userPermissionService.assignPermissionToUser(userId, permissionId, appId);
  }

  @Delete('user/:userId/permission/:permissionId/app/:appId')
  @ApiResponse({
    status: 200,
    description: 'Permission removed from user successfully',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user',
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'permissionId',
    description: 'The ID of the permission',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'appId',
    description: 'The ID of the application',
    required: true,
    type: Number,
  })
  async removePermissionFromUser(
    @Param('userId') userId: string,
    @Param('permissionId') permissionId: number,
    @Param('appId') appId: number,
  ): Promise<void> {
    await this.userPermissionService.removePermissionFromUser(userId, permissionId, appId);
  }

  @Get('user/:userId/permissions/app/:appId')
  @ApiResponse({
    status: 200,
    description: 'User permissions retrieved successfully',
    type: [PermissionDto],
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user',
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'appId',
    description: 'The ID of the application',
    required: true,
    type: Number,
  })
  async getUserPermissions(
    @Param('userId') userId: string,
    @Param('appId') appId: number,
  ): Promise<PermissionDto[]> {
    return await this.userPermissionService.getUserPermissions(userId, appId);
  }

  @Get('user/:userId/permissions/resource/:resourceId')
  @ApiResponse({
    status: 200,
    description: 'User permissions for resource retrieved successfully',
    type: [PermissionDto],
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user',
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'resourceId',
    description: 'The ID of the resource',
    required: true,
    type: Number,
  })
  async getUserPermissionsByResource(
    @Param('userId') userId: string,
    @Param('resourceId') resourceId: number,
  ): Promise<PermissionDto[]> {
    return await this.userPermissionService.getUserPermissionsByResource(userId, resourceId);
  }

  @Get('user/:userId/permissions-by-resource')
  @ApiResponse({
    status: 200,
    description: 'User permissions grouped by resource retrieved successfully',
    type: [ResourcePermissionsDto],
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user',
    required: true,
    type: String,
  })
  async getUserPermissionsGroupedByResource(
    @Param('userId') userId: string,
  ): Promise<ResourcePermissionsDto[]> {
    return await this.userPermissionService.getUserPermissionsGroupedByResource(userId);
  }

  @Get('user/:userId/has-permission/:permissionId/app/:appId')
  @ApiResponse({
    status: 200,
    description: 'Check if user has permission',
    type: Boolean,
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user',
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'permissionId',
    description: 'The ID of the permission',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'appId',
    description: 'The ID of the application',
    required: true,
    type: Number,
  })
  async hasPermission(
    @Param('userId') userId: string,
    @Param('permissionId') permissionId: number,
    @Param('appId') appId: number,
  ): Promise<boolean> {
    return await this.userPermissionService.hasPermission(userId, permissionId, appId);
  }

  // Access Template Management
  @Post('user/:userId/template/:templateId')
  @ApiResponse({
    status: 200,
    description: 'User assigned to template successfully',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user',
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'templateId',
    description: 'The ID of the access template',
    required: true,
    type: Number,
  })
  async assignUserToTemplate(
    @Param('userId') userId: string,
    @Param('templateId') templateId: number,
  ): Promise<void> {
    await this.userPermissionService.assignUserToTemplate(userId, templateId);
  }

  @Delete('user/:userId/template/:templateId')
  @ApiResponse({
    status: 200,
    description: 'User removed from template successfully',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user',
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'templateId',
    description: 'The ID of the access template',
    required: true,
    type: Number,
  })
  async removeUserFromTemplate(
    @Param('userId') userId: string,
    @Param('templateId') templateId: number,
  ): Promise<void> {
    await this.userPermissionService.removeUserFromTemplate(userId, templateId);
  }

  @Post('template/:templateId/permission/:permissionId/app/:appId')
  @ApiResponse({
    status: 200,
    description: 'Permission assigned to template successfully',
  })
  @ApiParam({
    name: 'templateId',
    description: 'The ID of the access template',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'permissionId',
    description: 'The ID of the permission',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'appId',
    description: 'The ID of the application',
    required: true,
    type: Number,
  })
  async assignPermissionToTemplate(
    @Param('templateId') templateId: number,
    @Param('permissionId') permissionId: number,
    @Param('appId') appId: number,
  ): Promise<void> {
    await this.userPermissionService.assignPermissionToTemplate(templateId, permissionId, appId);
  }

  @Delete('template/:templateId/permission/:permissionId/app/:appId')
  @ApiResponse({
    status: 200,
    description: 'Permission removed from template successfully',
  })
  @ApiParam({
    name: 'templateId',
    description: 'The ID of the access template',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'permissionId',
    description: 'The ID of the permission',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'appId',
    description: 'The ID of the application',
    required: true,
    type: Number,
  })
  async removePermissionFromTemplate(
    @Param('templateId') templateId: number,
    @Param('permissionId') permissionId: number,
    @Param('appId') appId: number,
  ): Promise<void> {
    await this.userPermissionService.removePermissionFromTemplate(templateId, permissionId, appId);
  }

  // Grant Flow Management
  @Post('permission/:permissionId/grant-flow/:grantFlowId/app/:appId')
  @ApiResponse({
    status: 200,
    description: 'Grant flow set for permission successfully',
  })
  @ApiParam({
    name: 'permissionId',
    description: 'The ID of the permission',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'grantFlowId',
    description: 'The ID of the grant flow',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'appId',
    description: 'The ID of the application',
    required: true,
    type: Number,
  })
  async setGrantFlowForPermission(
    @Param('permissionId') permissionId: number,
    @Param('grantFlowId') grantFlowId: number,
    @Param('appId') appId: number,
  ): Promise<void> {
    await this.userPermissionService.setGrantFlowForPermission(permissionId, grantFlowId, appId);
  }

  // User Access Templates
  @Get('user/:userId/templates')
  @ApiResponse({
    status: 200,
    description: 'User access templates retrieved successfully',
    type: [AccessTemplateDto],
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user',
    required: true,
    type: String,
  })
  async getUserAccessTemplates(
    @Param('userId') userId: string,
  ): Promise<AccessTemplateDto[]> {
    return await this.userPermissionService.getUserAccessTemplates(userId);
  }
  @Post("grant-flow/done")
  @ApiResponse({
    status: 200,
    description: 'Grant Flow Completed',
  })
  async grantFlowDone(@Body() body: any): Promise<void> {
    Logger.log(body)
    if(body.allowed){
      await this.userPermissionService.assignPermissionToUser(body.userId, body.permissionId)
    }
  }
}
