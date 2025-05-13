import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CrudStrategy } from '../../strategies/crud.strategy';
import { GrantFlowDto } from '../../dto/grant-flow.dto';
import { GrantFlow } from '../../db/entity/grant-flow';

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
}
