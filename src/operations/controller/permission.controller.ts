import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PermissionService } from '../service/permission.service';
import { PermissionDto } from '../../dto/permission.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('entities/permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post("")
  @ApiResponse({
    status: 200,
    description: 'Permission Created Successfully',
    type: PermissionDto,
  })
  async permissionCreate(@Body() permission: PermissionDto): Promise<PermissionDto> {
    return await this.permissionService.createPermission(permission);
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: 'Permission Found',
    type: PermissionDto,
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the Permission",
    required: true,
    type: Number,
  })
  async permissionRead(@Param() params: any): Promise<PermissionDto> {
    return await this.permissionService.readPermission(params.id);
  }

  @Patch("")
  @ApiResponse({
    status: 200,
    description: 'Permission Updated successfully',
    type: PermissionDto,
  })
  async permissionUpdate(@Body() permission: PermissionDto): Promise<PermissionDto> {
    return await this.permissionService.updatePermission(permission);
  }

  @Delete(":id")
  @ApiResponse({
    status: 200,
    description: 'Permission Deleted Successfully',
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the Permission",
    required: true,
    type: Number,
  })
  async permissionDelete(@Param() params: any): Promise<void> {
    await this.permissionService.deletePermission(params.id);
  }

  @Get('resource/:resourceId')
  @ApiResponse({
    status: 200,
    description: 'Permissions for resource retrieved successfully',
    type: [PermissionDto],
  })
  @ApiParam({
    name: 'resourceId',
    description: "The ID of the Resource",
    required: true,
    type: Number,
  })
  async getPermissionsByResource(@Param('resourceId') resourceId: number): Promise<PermissionDto[]> {
    return await this.permissionService.getPermissionsByResource(resourceId);
  }
}
