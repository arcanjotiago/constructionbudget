import { Entity, Column, PrimaryGeneratedColumn, Timestamp, OneToMany } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: UUID;
  
  @Column('timestamp with time zone')
  created_at: Timestamp;
  
  @Column('text')
  client_name: string;

  @Column('text')
  client_phone: string;
  
  @Column('text')
  address: string;
  
  @Column('text')
  service_type: string;

  @Column('text')
  materials: Array<string>;

  @Column('money')
  labor_price: string;

  @Column('money')
  amount: string;

  @Column('text')
  user_id: UUID;

}