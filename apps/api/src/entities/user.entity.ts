import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseModelEntity } from './base.entity';
import { Gender } from '../enums';
import { Expense } from './expense.entity';

@Entity()
export class User extends BaseModelEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
  gender: Gender;

  @Column()
  phone: string;

  @ManyToMany(() => Expense)
  @JoinTable()
  expenses: Expense[];
}
