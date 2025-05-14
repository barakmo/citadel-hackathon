import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CrudStrategy } from '../../strategies/crud.strategy';
import { GrantFlowDto } from '../../dto/grant-flow.dto';
import { GrantFlow } from '../../db/entity/grant-flow';
import { CitadelConfig } from '../../config';
import { GrantFlowStartDto } from '../../dto/grant-flow-start.dto';
import { Permission } from '../../db/entity/permission';
import { ActiveFlow } from '../../db/entity/active-flows';
import { User } from '../../db/entity/user';
import { GrantFlowStartRespDto } from '../../dto/grant-flow-start-resp';

@Injectable()
export class GrantFlowService {
  constructor(
    @Inject('CRUD_PROVIDER')
    private crud: CrudStrategy,
  ) {}

  async getAllGrantFlows(): Promise<GrantFlowDto[]> {
    const grantFlows = await this.crud.readAllWithRelations<GrantFlow>('GrantFlow', {}, []);
    return grantFlows.map(flow => GrantFlowDto.fromGrantFlow(flow));
  }

  async createGrantFlow(dto: GrantFlowDto): Promise<GrantFlowDto> {
    const newGrantFlow = GrantFlowDto.toGrantFlow(dto);
    newGrantFlow.id = null;
    const grantFlow = await this.crud.create<GrantFlow>(newGrantFlow);
    if (!grantFlow) {
      throw new NotFoundException('Grant Flow not Created');
    }
    return GrantFlowDto.fromGrantFlow(grantFlow);
  }

  async readGrantFlow(id: number): Promise<GrantFlowDto> {
    const search = new GrantFlow();
    search.id = id;
    const grantFlow = await this.crud.read<GrantFlow>(search);
    if (!grantFlow) {
      throw new NotFoundException('Grant Flow not found');
    }
    return GrantFlowDto.fromGrantFlow(grantFlow);
  }

  async updateGrantFlow(dto: GrantFlowDto): Promise<GrantFlowDto> {
    const grantFlow = await this.crud.update<GrantFlow>(GrantFlowDto.toGrantFlow(dto));
    if (!grantFlow) {
      throw new NotFoundException('Grant Flow not found');
    }
    return GrantFlowDto.fromGrantFlow(grantFlow);
  }

  async deleteGrantFlow(id: number): Promise<void> {
    const search = new GrantFlow();
    search.id = id;
    const grantFlow = await this.crud.read<GrantFlow>(search);
    if (!grantFlow) {
      throw new NotFoundException('Grant Flow not found');
    }
    await this.crud.delete<GrantFlow>(grantFlow);
  }

  async startGrantFlow(id: number,data:GrantFlowStartDto): Promise<void> {
    const searchUser = new User();
    searchUser.userId = data.userId;
    const user = await this.crud.read<User>(searchUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const searchGrantFlow = new GrantFlow();
    searchGrantFlow.id = id;
    const grantFlow = await this.crud.read<GrantFlow>(searchGrantFlow);
    if (!grantFlow) {
      throw new NotFoundException('Grant Flow not found');
    }
    const searchPermission = new Permission();
    searchPermission.id = data.permissionId;
    const permission = await this.crud.read<Permission>(searchPermission);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    const url = CitadelConfig.n8nUrl + grantFlow.flowId;

    const reqData = {
      userId: data.userId,
      permissionId: data.permissionId,
      permissionName: permission.name
    }

    const resp = await fetch(url,{
      method: "POST",
      body: JSON.stringify(reqData)
    });

    const result:GrantFlowStartRespDto = await resp.json();

    const activeFlow = new ActiveFlow();
    activeFlow.flowId = result.flowExecutionId;
    activeFlow.user = user;
    activeFlow.permission = permission;
    const savedFlow = await activeFlow.save()

    if (!savedFlow || !savedFlow.hasId()) {
      throw new InternalServerErrorException('Flow Not Started');
    }

  }
}
