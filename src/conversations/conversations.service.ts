import { Injectable } from '@nestjs/common';
import { CreateConversationParams } from 'src/utils/types';
import { IConversations } from './conversations';

@Injectable()
export class ConversationsService implements IConversations {
  createConversation(params: CreateConversationParams) {}
}
