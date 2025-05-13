import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CrudStrategy } from '../../strategies/crud.strategy';
import { ApplicationDto } from '../../dto/application.dto';
import { Application } from '../../db/entity/application';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('CRUD_PROVIDER')
    private crud: CrudStrategy,
  ) {}

  async getAllApplications(): Promise<ApplicationDto[]> {
    const applications = await this.crud.readAllWithRelations<Application>('Application', {}, []);
    return applications.map(app => ApplicationDto.fromApplication(app));
  }

  async createApplication(dto: ApplicationDto): Promise<ApplicationDto> {
    const newApplication = ApplicationDto.toApplication(dto);
    newApplication.id = null;
    const application = await this.crud.create<Application>(newApplication);
    if (!application) {
      throw new NotFoundException('Application not Created');
    }
    return ApplicationDto.fromApplication(application);
  }

  async readApplication(id: number): Promise<ApplicationDto> {
    const search = new Application();
    search.id = id;
    const application = await this.crud.read<Application>(search);
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return ApplicationDto.fromApplication(application);
  }

  async updateApplication(dto: ApplicationDto): Promise<ApplicationDto> {
    const application = await this.crud.update<Application>(ApplicationDto.toApplication(dto));
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return ApplicationDto.fromApplication(application);
  }

  async deleteApplication(id: number): Promise<void> {
    const search = new Application();
    search.id = id;
    const application = await this.crud.read<Application>(search);
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    await this.crud.delete<Application>(application);
  }
}
