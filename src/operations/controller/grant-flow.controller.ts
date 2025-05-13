import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GrantFlowService } from '../service/grant-flow.service';
import { GrantFlowDto } from '../../dto/grant-flow.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('entities/grant-flow')
export class GrantFlowController {
  constructor(private readonly grantFlowService: GrantFlowService) {}

  @Get()
  @ApiOperation({ summary: 'List all grant flows' })
  @ApiResponse({
    status: 200,
    description: 'List of all grant flows',
    type: [GrantFlowDto],
  })
  async getAllGrantFlows(): Promise<GrantFlowDto[]> {
    return await this.grantFlowService.getAllGrantFlows();
  }

  @Post("")
  @ApiResponse({
    status: 200,
    description: 'Grant Flow Created Successfully',
    type: GrantFlowDto,
  })
  async grantFlowCreate(@Body() grantFlow: GrantFlowDto): Promise<GrantFlowDto> {
    return await this.grantFlowService.createGrantFlow(grantFlow);
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: 'Grant Flow Found',
    type: GrantFlowDto,
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the Grant Flow",
    required: true,
    type: Number,
  })
  async grantFlowRead(@Param() params: any): Promise<GrantFlowDto> {
    return await this.grantFlowService.readGrantFlow(params.id);
  }

  @Patch("")
  @ApiResponse({
    status: 200,
    description: 'Grant Flow Updated successfully',
    type: GrantFlowDto,
  })
  async grantFlowUpdate(@Body() grantFlow: GrantFlowDto): Promise<GrantFlowDto> {
    return await this.grantFlowService.updateGrantFlow(grantFlow);
  }

  @Delete(":id")
  @ApiResponse({
    status: 200,
    description: 'Grant Flow Deleted Successfully',
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the Grant Flow",
    required: true,
    type: Number,
  })
  async grantFlowDelete(@Param() params: any): Promise<void> {
    await this.grantFlowService.deleteGrantFlow(params.id);
  }
}
