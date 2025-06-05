import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('todos')
export class Todo {
  @ApiProperty({ description: 'Unique identifier of the todo' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Title of the todo' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Description of the todo', required: false })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Whether the todo is completed', default: false })
  @Column({ default: false })
  completed: boolean;

  @ApiProperty({ description: 'Creation date of the todo' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the todo' })
  @UpdateDateColumn()
  updatedAt: Date;
}
