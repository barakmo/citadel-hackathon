import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './db/entity/user';
import { Application } from './db/entity/application';
import { AccessTemplate } from './db/entity/access-template';
import { GrantFlow } from './db/entity/grant-flow';
import { Resource } from './db/entity/resource';
import { Permission } from './db/entity/permission';

@Injectable()
export class CitadelService {
  constructor(
    @Inject('DATA_SOURCE')
    private db: DataSource,
  ) {}

  async initDb() {

    //Set Up Users
    const user1 = await this.newUser("user-1");
    const user2 = await this.newUser("user-2");
    const user3 = await this.newUser("user-3");
    const user4 = await this.newUser("user-4");
    const user5 = await this.newUser("user-5");
    const user6 = await this.newUser("user-6");
    const user7 = await this.newUser("user-7");
    const user8 = await this.newUser("user-8");

    const app1 = await this.newApplication("application-1");
    const app2 = await this.newApplication("application-2");

    const at1 = await this.newAccessTemplate("template-1");
    const at2 = await this.newAccessTemplate("template-2");

    const grantFlow1 = await this.newGrantFlow("grant-flow-1","grant-flow-numba-1");

    const resource1 = await this.newResource("resource-1",app1);
    const resource2 = await this.newResource("resource-2",app1);
    const resource3 = await this.newResource("resource-3",app2);
    const resource4 = await this.newResource("resource-4",app2);

    const permReadResource1 = await this.newPermission("read resource-1","permission-read-resource-1",app1,resource1,grantFlow1);
    const permCreateResource1 = await this.newPermission("create resource-1","permission-create-resource-1",app1,resource1,grantFlow1);
    const permDeleteResource1 = await this.newPermission("delete resource-1","permission-delete-resource-1",app1,resource1,grantFlow1);
    const permUpdateResource1 = await this.newPermission("update resource-1","permission-update-resource-1",app1,resource1,grantFlow1);
    const permReadResource2 = await this.newPermission("read resource-2","permission-read-resource-2",app1,resource2,grantFlow1);
    const permCreateResource2 = await this.newPermission("create resource-2","permission-create-resource-2",app1,resource2,grantFlow1);
    const permDeleteResource2 = await this.newPermission("delete resource-2","permission-delete-resource-2",app1,resource2,grantFlow1);
    const permUpdateResource2 = await this.newPermission("update resource-2","permission-update-resource-2",app1,resource2,grantFlow1);
    const permReadResource3 = await this.newPermission("read resource-3","permission-read-resource-3",app2,resource3,grantFlow1);
    const permCreateResource3 = await this.newPermission("create resource-3","permission-create-resource-3",app2,resource3,grantFlow1);
    const permDeleteResource3 = await this.newPermission("delete resource-3","permission-delete-resource-3",app2,resource3,grantFlow1);
    const permUpdateResource3 = await this.newPermission("update resource-3","permission-update-resource-3",app2,resource3,grantFlow1);
    const permReadResource4 = await this.newPermission("read resource-4","permission-read-resource-4",app2,resource4,grantFlow1);
    const permCreateResource4 = await this.newPermission("create resource-4","permission-create-resource-4",app2,resource4,grantFlow1);
    const permDeleteResource4 = await this.newPermission("delete resource-4","permission-delete-resource-4",app2,resource4,grantFlow1);
    const permUpdateResource4 = await this.newPermission("update resource-4","permission-update-resource-4",app2,resource4,grantFlow1);

    user1.templates = [at1,at2]
    user1.allowedPermissions = [permReadResource1,permReadResource2];
    await user1.save();

    user2.templates = [at1];
    await user2.save();
    user3.templates = [at1];
    await user3.save();
    user4.templates = [at1];
    await user4.save();
    user5.templates = [at2];
    await user5.save();
    user6.templates = [at2];
    await user6.save();
    user7.templates = [at2];
    await user7.save();
    user8.templates = [at2];
    await user8.save();

    at1.permissions = [permReadResource1];
    at1.permissions = [permCreateResource1];
    at1.permissions = [permDeleteResource1];
    at1.permissions = [permUpdateResource1];
    at1.permissions = [permReadResource3];
    at1.permissions = [permCreateResource3];
    at1.permissions = [permDeleteResource3];
    at1.permissions = [permUpdateResource3];
    await at1.save();

    at2.permissions = [permReadResource2];
    at2.permissions = [permCreateResource2];
    at2.permissions = [permDeleteResource2];
    at2.permissions = [permUpdateResource2];
    at2.permissions = [permReadResource4];
    at2.permissions = [permCreateResource4];
    at2.permissions = [permDeleteResource4];
    at2.permissions = [permUpdateResource4];
    await at2.save();

  }
  async newUser(id:string){
    const user = new User();
    user.userId = id;
    return await user.save();
  }
  async newApplication(name:string){
    const app = new Application();
    app.name = name;
    app.id = null;
    return await app.save();
  }

  async newAccessTemplate(name:string){
    const at = new AccessTemplate();
    at.name = name;
    at.id = null;
    return await at.save();
  }
  async newGrantFlow(name:string,flowId:string){
    const gf = new GrantFlow();
    gf.name = name;
    gf.flowId = flowId;
    gf.id = null;
    return await gf.save();
  }
  async newResource(name:string,app:Application){
    const resource = new Resource();
    resource.name = name;
    resource.app = app;
    resource.id = null;
    return await resource.save();
  }
  async newPermission(name:string,technicalId:string,app:Application,resource:Resource,grantFlow:GrantFlow){
    const permission = new Permission();
    permission.name = name;
    permission.technicalId = technicalId;
    permission.app = app;
    permission.resource = resource;
    permission.grantFlow = grantFlow;
    permission.id = null;
    return await permission.save();
  }
}
