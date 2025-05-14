import { Controller, Get } from '@nestjs/common';
import { CitadelService } from './citadel.service';

@Controller()
export class CitadelController {
  constructor(private readonly citadelService: CitadelService) {}

  @Get("/initialize")
  async initialize(){
    await this.citadelService.initDb();
  }
}
