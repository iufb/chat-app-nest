import { Request } from 'express';
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
  recipientId: number;
  message: string;
};

export interface AuthenticatedRequest extends Request {
  user: User;
}
export type CreateMessageParams = {
  content: string;
  conversationId: number;
  user: User;
};
