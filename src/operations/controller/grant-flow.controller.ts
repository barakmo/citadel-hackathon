import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { GrantFlowService } from '../service/grant-flow.service';
import { GrantFlowDto } from '../../dto/grant-flow.dto';
import { ApiOperation,ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GrantFlowStartDto } from '../../dto/grant-flow-start.dto';

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
  @Post(":id/start")
  @ApiResponse({
    status: 200,
    description: 'Grant Flow Started',
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the Grant Flow",
    required: true,
    type: Number,
  })
  @ApiBody({
    description: "Request Data",
    required: true,
    type: GrantFlowStartDto,
  })
  async grantFlowStart(@Param() params: any,@Body() data:GrantFlowStartDto): Promise<void> {
    await this.grantFlowService.startGrantFlow(params.id,data);
  }
  @Post("done")
  @ApiResponse({
    status: 200,
    description: 'Grant Flow Completed',
  })
  async grantFlowDone(@Body() body: any): Promise<void> {
    Logger.log(body)
  }
}