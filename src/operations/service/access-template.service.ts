import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CrudStrategy } from '../../strategies/crud.strategy';
import { AccessTemplateDto } from '../../dto/access-template.dto';
import { AccessTemplate } from '../../db/entity/access-template';

@Injectable()
export class AccessTemplateService {
  constructor(
    @Inject('CRUD_PROVIDER')
    private crud: CrudStrategy,
  ) {}
  
  async createAccessTemplate(dto: AccessTemplateDto): Promise<AccessTemplateDto> {
    const newTemplate = AccessTemplateDto.toAccessTemplate(dto);
    newTemplate.id = null;
    const template = await this.crud.create<AccessTemplate>(newTemplate);
    if (!template) {
      throw new NotFoundException('Access Template not Created');
    }
    return AccessTemplateDto.fromAccessTemplate(template);
  }
  
  async readAccessTemplate(id: number): Promise<AccessTemplateDto> {
    const search = new AccessTemplate();
    search.id = id;
    const template = await this.crud.read<AccessTemplate>(search);
    if (!template) {
      throw new NotFoundException('Access Template not found');
    }
    return AccessTemplateDto.fromAccessTemplate(template);
  }
  
  async updateAccessTemplate(dto: AccessTemplateDto): Promise<AccessTemplateDto> {
    const template = await this.crud.update<AccessTemplate>(AccessTemplateDto.toAccessTemplate(dto));
    if (!template) {
      throw new NotFoundException('Access Template not found');
    }
    return AccessTemplateDto.fromAccessTemplate(template);
  }
  
  async deleteAccessTemplate(id: number): Promise<void> {
    const search = new AccessTemplate();
    search.id = id;
    const template = await this.crud.read<AccessTemplate>(search);
    if (!template) {
      throw new NotFoundException('Access Template not found');
    }
    await this.crud.delete<AccessTemplate>(template);
  }
}