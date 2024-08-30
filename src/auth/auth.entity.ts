import { Entity, Column, PrimaryGeneratedColumn, Timestamp} from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: UUID;
  
  @Column('timestamp with time zone')
  created_at: Timestamp;
  
  @Column('text')
  access_token: string;
  
  @Column('text')
  validity: number;

  @Column('text')
  user_id: string; 
}