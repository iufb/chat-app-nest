import { Participant } from 'src/utils/typeorm';
import {
  CreateParticipantParams,
  FindParticipantParams,
} from 'src/utils/types';

export interface IParticipant {
  findParticipant(params: FindParticipantParams): Promise<Participant | null>;
  createParticipant(params: CreateParticipantParams): Promise<Participant>;
  findParticipantConversations(id: number);
}
