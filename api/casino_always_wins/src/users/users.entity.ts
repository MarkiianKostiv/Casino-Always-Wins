import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { randomUUID } from 'crypto';
@Entity()
@Unique(['username', 'email'])
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @BeforeInsert()
  generateId() {
    this.id = randomUUID();
  }
}
