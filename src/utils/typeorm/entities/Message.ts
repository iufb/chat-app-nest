import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './Conversation';
import { User } from './User';

@Entity({ name: 'message' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;
  @ManyToOne(() => User, (user) => user.messages)
  author: User;
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
