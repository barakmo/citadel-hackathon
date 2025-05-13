import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AccessTemplateService } from '../service/access-template.service';
import { AccessTemplateDto } from '../../dto/access-template.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('entities/access-template')
export class AccessTemplateController {
  constructor(private readonly accessTemplateService: AccessTemplateService) {}

  @Post("")
  @ApiResponse({
    status: 200,
    description: 'Access Template Created Successfully',
    type: AccessTemplateDto,
  })
  async templateCreate(@Body() template: AccessTemplateDto): Promise<AccessTemplateDto> {
    return await this.accessTemplateService.createAccessTemplate(template);
  }
  
  @Get(":id")
  @ApiResponse({
    status: 200,
    description: 'Access Template Found',
    type: AccessTemplateDto,
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the Access Template",
    required: true,
    type: Number,
  })
  async templateRead(@Param() params: any): Promise<AccessTemplateDto> {
    return await this.accessTemplateService.readAccessTemplate(params.id);
  }
  
  @Patch("")
  @ApiResponse({
    status: 200,
    description: 'Access Template Updated successfully',
    type: AccessTemplateDto,
  })
  async templateUpdate(@Body() template: AccessTemplateDto): Promise<AccessTemplateDto> {
    return await this.accessTemplateService.updateAccessTemplate(template);
  }
  
  @Delete(":id")
  @ApiResponse({
    status: 200,
    description: 'Access Template Deleted Successfully',
  })
  @ApiParam({
    name: 'id',
    description: "The ID of the Access Template",
    required: true,
    type: Number,
  })
  async templateDelete(@Param() params: any): Promise<void> {
    await this.accessTemplateService.deleteAccessTemplate(params.id);
  }
}