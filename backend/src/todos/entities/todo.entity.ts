import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Todo {
  @ApiProperty({ description: 'The unique identifier of the todo' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The title of the todo' })
  @Column()
  title: string;

  @ApiProperty({ description: 'The description of the todo', nullable: true })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Whether the todo is completed', default: false })
  @Column({ default: false })
  completed: boolean;

  @ApiProperty({ description: 'The creation date of the todo' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The last update date of the todo' })
  @UpdateDateColumn()
  updatedAt: Date;
}
