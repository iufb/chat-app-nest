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
  recipeintId: number;
  message: string;
};
