import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { StrategiesModule } from '../strategies/strategies.module';
import { UserService } from './service/user.service';
import { ApplicationController } from './controller/application.controller';
import { ApplicationService } from './service/application.service';
import { GrantFlowController } from './controller/grant-flow.controller';
import { GrantFlowService } from './service/grant-flow.service';
import { PermissionController } from './controller/permission.controller';
import { PermissionService } from './service/permission.service';
import { AccessTemplateController } from './controller/access-template.controller';
import { AccessTemplateService } from './service/access-template.service';
import { TypeormStrategy } from '../strategies/typeorm-strategy';
import { UserPermissionService } from './service/user-permission.service';
import { UserPermissionController } from './controller/user-permission.controller';
import { ResourceService } from './service/resource.service';
import { ResourceController } from './controller/resource.controller';

@Module({
  imports: [StrategiesModule],
  controllers: [
    UserController,
    ApplicationController,
    GrantFlowController,
    PermissionController,
    AccessTemplateController,
    UserPermissionController,
    ResourceController
  ],
  providers: [
    UserService,
    ApplicationService,
    GrantFlowService,
    PermissionService,
    AccessTemplateService,
    UserPermissionService,
    ResourceService,
    {
      provide: 'CRUD_PROVIDER',
      useClass: TypeormStrategy,
    },
  ],
  exports: [
    UserService,
    ApplicationService,
    GrantFlowService,
    PermissionService,
    AccessTemplateService,
    UserPermissionService,
    ResourceService,
  ],
})
export class OperationsModule {}
