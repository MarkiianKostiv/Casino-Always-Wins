import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { randomUUID } from 'crypto';
@Entity()
export class Games {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  userId: string;
  @Column()
  userName: string;
  @Column()
  gameResult: boolean;
  @BeforeInsert()
  generateId() {
    this.id = randomUUID();
  }
}
