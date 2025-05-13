import { Module } from '@nestjs/common';
import { strategiesProviders } from './strategies.providers';

@Module({
  providers: [...strategiesProviders],
  exports: [...strategiesProviders],
})
export class StrategiesModule {}