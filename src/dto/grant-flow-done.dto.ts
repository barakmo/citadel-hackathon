export class GrantFlowDoneDto {
  userId: string;
  permissionId: number;
  allowed: boolean;
  flowExecutionId: string;
}
