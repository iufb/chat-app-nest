import { User } from './User';
import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './Conversation';

@Entity({ name: 'participant' })
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Conversation, (conversation) => conversation.participants)
  @JoinTable()
  conversations: Conversation[];
  @OneToOne(() => User, (user) => user.participant)
  user: User;
}
