import { Module } from '@nestjs/common';
import { CitadelController } from './citadel.controller';
import { CitadelService } from './citadel.service';
import { DatabaseModule } from './db/database.module';
import { OperationsModule } from './operations/operations.module';

@Module({
  imports: [DatabaseModule, OperationsModule],
  controllers: [CitadelController],
  providers: [CitadelService],
})
export class CitadelModule {}
