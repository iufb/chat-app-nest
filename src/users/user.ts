import { User } from 'src/utils/typeorm';
import { CreateUserDetails, FindUser } from 'src/utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;
  findUser(findUser: FindUser): Promise<User>;
  saveUser(user: User): Promise<User>;
}
