import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/helpers';
import { User } from 'src/utils/typeorm';
import { CreateUserDetails, FindUser } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IUserService } from './user';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userDetails: CreateUserDetails) {
    const findUser = await this.userRepository.findOne({
      email: userDetails.email,
    });
    if (findUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const password = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({ ...userDetails, password });
    return this.userRepository.save(newUser);
  }
  async findUser(findUser: FindUser): Promise<User> {
    return this.userRepository.findOne(findUser, {
      relations: ['participant'],
    });
  }
  async saveUser(user: User) {
    return this.userRepository.save(user);
  }
}
