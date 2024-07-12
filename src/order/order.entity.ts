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
  address: string;
  
  @Column('text')
  service_type: string;

  @Column('text')
  materials: string;

  @Column('money')
  labor_price: string;

  @Column('money')
  amount: string;

  @Column('UUID')
  user_id: UUID;

}