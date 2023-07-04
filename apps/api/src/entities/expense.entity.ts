import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { ExpenseType } from './expense-type.entity';

@Entity()
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToOne(() => ExpenseType, (expenseType) => expenseType.expenses)
  expenseType: ExpenseType;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;
}
