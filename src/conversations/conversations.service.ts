import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IParticipant } from 'src/participant/participant';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { Conversation, Participant, User } from 'src/utils/typeorm';
import {
  CreateConversationParams,
  FindParticipantParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import { IConversations } from './conversations';

@Injectable()
export class ConversationsService implements IConversations {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.PARTICIPANTS)
    private readonly participantService: IParticipant,
    @Inject(Services.USERS)
    private readonly usersService: IUserService,
  ) {}
  find(id: number): Promise<Participant> {
    return this.participantService.findParticipantConversations(id);
  }
  async findConversationById(id: number): Promise<Conversation> {
    return this.conversationRepository.findOne(id, {
      relations: ['participants', 'participants.user'],
    });
  }
  async createConversation(params: CreateConversationParams, user: User) {
    const userDb = await this.usersService.findUser({ id: user.id });
    const { authorId, recipientId } = params;
    const participants: Participant[] = [];
    if (!userDb.participant) {
      const participant = await this.createParticipantAndSave(userDb, authorId);
      participants.push(participant);
    } else {
      participants.push(userDb.participant);
    }
    const recipient = await this.usersService.findUser({
      id: params.recipientId,
    });

    if (!recipient) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (!recipient.participant) {
      const participant = await this.createParticipantAndSave(
        recipient,
        recipientId,
      );
      participants.push(participant);
    } else {
      participants.push(recipient.participant);
    }
    const conversation = this.conversationRepository.create({
      participants,
    });
    return this.conversationRepository.save(conversation);
  }
  private async createParticipantAndSave(user: User, id: number) {
    const participant = await this.participantService.createParticipant({
      id,
    });
    user.participant = participant;
    await this.usersService.saveUser(user);
    return participant;
  }
}
