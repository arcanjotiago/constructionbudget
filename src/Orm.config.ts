import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './user/user.entity';
import { Auth } from './auth/auth.entity';
import { Material } from './material/material.entity';
import { Order } from './order/order.entity';
import { InitialMigration } from './database/migrations/initial.migration';

dotenv.config();

export function getConfig(){
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Auth, Material, Order],
      migrations: [InitialMigration],
      synchronize: false,
    } as DataSourceOptions;
  }


const datasource = new DataSource(getConfig());
datasource.initialize();

export default datasource;