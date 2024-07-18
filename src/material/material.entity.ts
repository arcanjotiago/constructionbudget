import { Entity, Column, PrimaryGeneratedColumn, Timestamp} from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: UUID;
  
  @Column('timestamp with time zone')
  created_at: Timestamp;
  
  @Column('text')
  name: string;
  
  @Column('money')
  value: string;

  @Column('text')
  description: string;

  @Column('numeric')
  quantity: number;

}