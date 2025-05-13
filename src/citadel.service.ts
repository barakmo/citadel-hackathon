import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './db/entity/user';

@Injectable()
export class CitadelService {
  constructor(
    @Inject('DATA_SOURCE')
    private db: DataSource,
  ) {}
}
