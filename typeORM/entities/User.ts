import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'timestamp', nullable: true })
  email_verified_at: Date;

  @Column()
  password: string;


  @CreateDateColumn()
  created_at: boolean;

  @UpdateDateColumn()
  updated_at: boolean;
}
