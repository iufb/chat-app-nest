import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { IUserService } from 'src/users/user';
import { Router, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { IConversations } from './conversations';
import { CreateConversationDto } from './dtos/CreateConversationDto';

@Controller(Router.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsServices: IConversations,
    @Inject(Services.USERS)
    private readonly usersService: IUserService,
  ) {}
  @Post()
  async createConversation(
    @Body() createPayload: CreateConversationDto,
    @AuthUser() user: User,
  ) {
    return this.conversationsServices.createConversation(createPayload, user);
  }
  @Get()
  async getConversations(@AuthUser() user: User) {
    console.log('get request');
    console.log(user.id);
    const participant = await this.conversationsServices.find(
      user.participant.id,
    );
    return participant.conversations.map((c) => ({
      ...c,
      recipient: c.participants.find((p) => p.user.id !== user.id),
    }));
  }
  @Get(':id')
  getConversationById(@Param('id') id: number) {
    return this.conversationsServices.findConversationById(id);
  }
}
