import { Conversation, Participant, User } from 'src/utils/typeorm';
import { CreateConversationParams } from 'src/utils/types';

export interface IConversations {
  createConversation(
    createConversationParams: CreateConversationParams,
    user: User,
  );
  find(id: number): Promise<Participant>;
  findConversationById(id: number): Promise<Conversation>;
}
