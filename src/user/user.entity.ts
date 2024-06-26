import { Entity, Column, PrimaryGeneratedColumn, Timestamp, OneToMany } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { Auth } from '../auth/auth.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: UUID;
  
  @Column('timestamp with time zone')
  created_at: Timestamp;
  
  @Column('text')
  name: string;
  
  @Column('text')
  email: string;
  
  @Column('text')
  password: string;

  @Column('text')
  @OneToMany(() => Auth, (auth: Auth) => auth.user_id)
  access_token: Auth[];

}