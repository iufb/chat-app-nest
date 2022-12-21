import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateUser } from 'src/dtos/CreateUser.dto';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { IAuthUService } from './auth';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthUService,
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUser) {
    console.log(createUserDto);
    const user = await this.userService.createUser(createUserDto);
    return instanceToPlain(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() res: Response) {
    return res.sendStatus(HttpStatus.OK);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  status(@Req() req: Request, @Res() res: Response) {
    console.log(req.user, 'status');
    res.send(req.user);
  }
}
