import { Conversation, User } from 'src/utils/typeorm';
import { CreateConversationParams } from 'src/utils/types';

export interface IConversations {
  createConversation(user: User, conversationParams: CreateConversationParams);
  getConversations(id: number): Promise<Conversation[]>;
  findConversationById(id: number): Promise<Conversation>;
}
