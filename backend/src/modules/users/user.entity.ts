import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Role } from '../auth/roles';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ type: 'text', default: 'USER' })
  role!: Role;

  @OneToMany(() => Task, t => t.owner)
  tasks!: Task[];
}
