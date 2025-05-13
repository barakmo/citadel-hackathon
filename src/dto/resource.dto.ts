import { Resource } from '../db/entity/resource';
import { Application } from '../db/entity/application';

export class ResourceDto {
  id: number;
  name: string;
  appId: number;

  static fromResource(resource: Resource): ResourceDto {
    const res: ResourceDto = new ResourceDto();
    res.id = resource.id;
    res.name = resource.name;
    res.appId = resource.app ? resource.app.id : null;
    return res;
  }

  static toResource(dto: ResourceDto): Resource {
    const resource = new Resource();
    resource.id = dto.id;
    resource.name = dto.name;

    if (dto.appId) {
      const app = new Application();
      app.id = dto.appId;
      resource.app = app;
    }

    return resource;
  }
}