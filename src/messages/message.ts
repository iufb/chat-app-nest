import { Message } from 'src/utils/typeorm';
import { CreateMessageParams } from 'src/utils/types';

export interface IMessage {
  createMessage(params: CreateMessageParams): Promise<Message>;
  getMessagesByConversation(conversationId: number): Promise<Message[]>;
}
