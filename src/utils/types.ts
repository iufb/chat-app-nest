import { User } from './typeorm';

export type CreateUserDetails = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type ValidateUserCredentials = {
  email: string;
  password: string;
};

export type FindUser = Partial<{
  email: string;
  id: number;
}>;

export type CreateConversationParams = {
  authorId: number;
  recipientId: number;
  message: string;
};

export type FindParticipantParams = Partial<{
  id: number;
}>;

export type CreateParticipantParams = {
  id: number;
};
export interface AuthenticatedRequest extends Request {
  user: User;
}
