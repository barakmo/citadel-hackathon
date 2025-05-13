import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CrudStrategy } from '../../strategies/crud.strategy';
import { ResourceDto } from '../../dto/resource.dto';
import { Resource } from '../../db/entity/resource';

@Injectable()
export class ResourceService {
  constructor(
    @Inject('CRUD_PROVIDER')
    private crud: CrudStrategy,
  ) {}
  
  async createResource(dto: ResourceDto): Promise<ResourceDto> {
    const newResource = ResourceDto.toResource(dto);
    newResource.id = null;
    const resource = await this.crud.create<Resource>(newResource);
    if (!resource) {
      throw new NotFoundException('Resource not Created');
    }
    return ResourceDto.fromResource(resource);
  }
  
  async readResource(id: number): Promise<ResourceDto> {
    const search = new Resource();
    search.id = id;
    const resource = await this.crud.readWithRelations<Resource>('Resource', { id }, ['app']);
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
    return ResourceDto.fromResource(resource);
  }
  
  async updateResource(dto: ResourceDto): Promise<ResourceDto> {
    const resource = await this.crud.update<Resource>(ResourceDto.toResource(dto));
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
    return ResourceDto.fromResource(resource);
  }
  
  async deleteResource(id: number): Promise<void> {
    const search = new Resource();
    search.id = id;
    const resource = await this.crud.read<Resource>(search);
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
    await this.crud.delete<Resource>(resource);
  }
  
  async getResourcesByApp(appId: number): Promise<ResourceDto[]> {
    const resources = await this.crud.readAllWithRelations<Resource>('Resource', { app: { id: appId } }, ['app']);
    return resources.map(resource => ResourceDto.fromResource(resource));
  }
}