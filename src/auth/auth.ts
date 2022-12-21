import { User } from 'src/utils/typeorm';
import { ValidateUserCredentials } from 'src/utils/types';

export interface IAuthUService {
  validateUser(userCredentials: ValidateUserCredentials);
}
