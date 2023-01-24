import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Message } from 'src/utils/typeorm';
import { CreateMessageParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IMessage } from './message';

@Injectable()
export class MessageService implements IMessage {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}
  async createMessage({
    conversationId,
    content,
    user,
  }: CreateMessageParams): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: {
        id: conversationId,
      },
      relations: ['creator', 'recipient'],
    });
    if (!conversation)
      throw new HttpException(
        'Conversation not found ',
        HttpStatus.BAD_REQUEST,
      );
    const { creator, recipient } = conversation;
    console.log(creator.id, recipient.id, user.id);
    if (creator.id !== user.id && recipient.id !== user.id)
      throw new HttpException(
        'Cannot create message in this conversation',
        HttpStatus.FORBIDDEN,
      );
    const newMessage = this.messageRepository.create({
      author: user,
      conversation,
      content,
    });
    const savedMessage = await this.messageRepository.save(newMessage);
    conversation.lastMessageSent = savedMessage;
    await this.conversationRepository.save(conversation);
    return savedMessage;
  }
  async getMessagesByConversation(conversationId: number): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: {
        conversation: {
          id: conversationId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });
    return messages;
  }
}
