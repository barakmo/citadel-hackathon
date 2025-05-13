import { Application } from '../db/entity/application';

export class ApplicationDto{
  id: number;
  name: string;

  static fromApplication(application: Application): ApplicationDto {
    const res: ApplicationDto = new ApplicationDto();
    res.id = application.id;
    res.name = application.name;
    return res;
  }

  static toApplication(dto: ApplicationDto): Application {
    const application = new Application();
    application.id = dto.id;
    application.name = dto.name;
    return application;
  }
}
