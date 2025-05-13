import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ResourceService } from '../service/resource.service';
import { ResourceDto } from '../../dto/resource.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { PermissionDto } from '../../dto/permission.dto';

@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  async createResource(@Body() dto: ResourceDto): Promise<ResourceDto> {
    return this.resourceService.createResource(dto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Resource Found',
    type: ResourceDto,
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the Resource",
    required: true,
    type: Number,
  })
  async getResource(@Param('id') id: number): Promise<ResourceDto> {
    return this.resourceService.readResource(id);
  }

  @Patch()
  async updateResource(@Body() dto: ResourceDto): Promise<ResourceDto> {
    return this.resourceService.updateResource(dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Resource Found',
    type: ResourceDto,
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the Resource",
    required: true,
    type: Number,
  })
  async deleteResource(@Param('id') id: number): Promise<void> {
    return this.resourceService.deleteResource(id);
  }

  @Get('app/:appId')
  async getResourcesByApp(@Param('appId') appId: number): Promise<ResourceDto[]> {
    return this.resourceService.getResourcesByApp(appId);
  }
}