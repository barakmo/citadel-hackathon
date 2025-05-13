import { DataSource } from "typeorm"
import { User } from './entity/user';
import { Permission } from './entity/permission';
import { GrantFlow } from './entity/grant-flow';
import { Application } from './entity/application';
import { AccessTemplate } from './entity/access-template';
import { Resource } from './entity/resource';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "better-sqlite3",
        database: "./dist/database/citadel-hackathon.db",
        entities: [User,Permission,GrantFlow,Application,AccessTemplate,Resource],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];