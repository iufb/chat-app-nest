import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { compareHash } from 'src/utils/helpers';
import { ValidateUserCredentials } from 'src/utils/types';
import { IAuthUService } from './auth';

@Injectable()
export class AuthService implements IAuthUService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
  async validateUser(userCredentials: ValidateUserCredentials) {
    const user = await this.userService.findUser({
      email: userCredentials.email,
    });
    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

    const isPasswordValid = await compareHash(
      userCredentials.password,
      user.password,
    );
    console.log(isPasswordValid);
    return isPasswordValid ? user : null;
  }
}
