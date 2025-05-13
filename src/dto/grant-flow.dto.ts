import { GrantFlow } from '../db/entity/grant-flow';

export class GrantFlowDto{
  id: number;
  name: string;
  flowId: string;

  static fromGrantFlow(grantFlow: GrantFlow): GrantFlowDto {
    const res: GrantFlowDto = new GrantFlowDto();
    res.id = grantFlow.id;
    res.name = grantFlow.name;
    res.flowId = grantFlow.flowId;
    return res;
  }

  static toGrantFlow(dto: GrantFlowDto): GrantFlow {
    const grantFlow = new GrantFlow();
    grantFlow.id = dto.id;
    grantFlow.name = dto.name;
    grantFlow.flowId = dto.flowId;
    return grantFlow;
  }
}
