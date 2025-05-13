import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApplicationService } from '../service/application.service';
import { ApplicationDto } from '../../dto/application.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('entities/application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @ApiOperation({ summary: 'List all applications' })
  @ApiResponse({
    status: 200,
    description: 'List of all applications',
    type: [ApplicationDto],
  })
  async getAllApplications(): Promise<ApplicationDto[]> {
    return await this.applicationService.getAllApplications();
  }

  @Post("")
  @ApiResponse({
    status: 200,
    description: 'Application Created Successfully',
    type: ApplicationDto,
  })
  async applicationCreate(@Body() application: ApplicationDto): Promise<ApplicationDto> {
    return await this.applicationService.createApplication(application);
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: 'Application Found',
    type: ApplicationDto,
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the Application",
    required: true,
    type: Number,
  })
  async applicationRead(@Param() params: any): Promise<ApplicationDto> {
    return await this.applicationService.readApplication(params.id);
  }

  @Patch("")
  @ApiResponse({
    status: 200,
    description: 'Application Updated successfully',
    type: ApplicationDto,
  })
  async applicationUpdate(@Body() application: ApplicationDto): Promise<ApplicationDto> {
    return await this.applicationService.updateApplication(application);
  }

  @Delete(":id")
  @ApiResponse({
    status: 200,
    description: 'Application Deleted Successfully',
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the Application",
    required: true,
    type: Number,
  })
  async applicationDelete(@Param() params: any): Promise<void> {
    await this.applicationService.deleteApplication(params.id);
  }
}
