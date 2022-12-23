import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from 'src/utils/typeorm';
import {
  CreateParticipantParams,
  FindParticipantParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import { IParticipant } from './participant';

@Injectable()
export class ParticipantService implements IParticipant {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {}

  createParticipant(params: CreateParticipantParams): Promise<Participant> {
    const participant = this.participantRepository.create(params);
    return this.participantRepository.save(participant);
  }
  findParticipant(params: FindParticipantParams): Promise<Participant> {
    return this.participantRepository.findOne(params);
  }
  findParticipantConversations(id: number) {
    return this.participantRepository
      .createQueryBuilder('participant')
      .leftJoinAndSelect('participant.conversations', 'conversations')
      .where('participant.id = :id', { id })
      .leftJoinAndSelect('conversations.participants', 'participants')
      .leftJoin('participants.user', 'user')
      .addSelect(['user.firstName', 'user.lastName', 'user.email'])
      .getOne();
  }
}
