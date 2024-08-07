import { DataSource } from 'typeorm';

export const reportProviders = [
  {
    provide: 'MATERIAL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Report),
    inject: ['DATA_SOURCE'],
  },
];