import { TypeormStrategy } from './typeorm-strategy';

export const strategiesProviders = [
  {
    provide: 'CRUD_PROVIDER',
    useFactory: () => new TypeormStrategy(),
  },
];