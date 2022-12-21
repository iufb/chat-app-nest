import { CreateConversationParams } from 'src/utils/types';

export interface IConversations {
  createConversation(createConversationParams: CreateConversationParams);
}
