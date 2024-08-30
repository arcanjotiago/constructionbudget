import { DataSource } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Auth } from 'src/auth/auth.entity';
import { Order } from 'src/order/order.entity';
import { Material } from 'src/material/material.entity';

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
        entities: [User, Auth, Order, Material],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

