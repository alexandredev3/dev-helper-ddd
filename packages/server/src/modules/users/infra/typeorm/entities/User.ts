import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  username: string;

  @Column('text', {
    nullable: true,
  })
  bio: string;

  @Column('varchar', {
    unique: true,
  })
  email: string;

  @Column('varchar')
  @Exclude()
  encrypted_password: string;

  @Column('varchar')
  tags: string;

  @Column('boolean', {
    default: false,
  })
  is_email_verified: boolean;

  @Column('boolean', {
    default: false,
  })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
