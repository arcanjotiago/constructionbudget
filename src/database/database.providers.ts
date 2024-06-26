import { DataSource } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Auth } from 'src/auth/auth.entity';


export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User, Auth],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

