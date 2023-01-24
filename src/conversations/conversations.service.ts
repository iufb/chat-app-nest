import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { Conversation, User } from 'src/utils/typeorm';
import { CreateConversationParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IConversations } from './conversations';

@Injectable()
export class ConversationsService implements IConversations {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.USERS)
    private readonly usersService: IUserService,
  ) {}
  async getConversations(id: number): Promise<Conversation[]> {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.creator', 'creator')
      .addSelect([
        'creator.id',
        'creator.firstName',
        'creator.lastName',
        'creator.email',
      ])
      .leftJoin('conversation.recipient', 'recipient')
      .addSelect([
        'recipient.id',
        'recipient.firstName',
        'recipient.lastName',
        'recipient.email',
      ])
      .where('creator.id = :id', { id })
      .orWhere('recipient.id = :id', { id })
      .orderBy('conversation.id', 'DESC')
      .getMany();
  }

  async findConversationById(id: number): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne(id);
    if (!conversation)
      throw new HttpException(
        'Conversation doesnt exists',
        HttpStatus.NOT_FOUND,
      );
    return conversation;
  }
  async createConversation(user: User, params: CreateConversationParams) {
    console.log(user);
    const { recipientId } = params;
    if (user.id === recipientId)
      throw new HttpException(
        'Cannot create conversation',
        HttpStatus.BAD_REQUEST,
      );
    const existingConversation = await this.conversationRepository.findOne({
      where: [
        {
          creator: { id: user.id },
          recipient: { id: recipientId },
        },
        {
          creator: { id: recipientId },
          recipient: { id: user.id },
        },
      ],
    });
    if (existingConversation)
      throw new HttpException(
        'Conversation already exist',
        HttpStatus.CONFLICT,
      );
    const recipient = await this.usersService.findUser({ id: recipientId });
    if (!recipient)
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);
    const conversation = this.conversationRepository.create({
      creator: user,
      recipient: recipient,
    });
    return this.conversationRepository.save(conversation);
  }
}
