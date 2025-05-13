import { AccessTemplate } from '../db/entity/access-template';

export class AccessTemplateDto{
  id: number;
  name: string;

  static fromAccessTemplate(template: AccessTemplate): AccessTemplateDto {
    const res: AccessTemplateDto = new AccessTemplateDto();
    res.id = template.id;
    res.name = template.name;
    return res;
  }

  static toAccessTemplate(dto: AccessTemplateDto): AccessTemplate {
    const template = new AccessTemplate();
    template.id = dto.id;
    template.name = dto.name;
    return template;
  }
}
