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
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { IConversations } from './conversations';
import { CreateConversationDto } from './dtos/CreateConversationDto';

@Controller(Routes.CONVERSATIONS)
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
    @AuthUser() user: User,
    @Body() createPayload: CreateConversationDto,
  ) {
    return this.conversationsServices.createConversation(user, createPayload);
  }
  @Get()
  async getConversations(@AuthUser() { id }: User) {
    return this.conversationsServices.getConversations(id);
  }
  @Get(':id')
  getConversationById(@Param('id') id: number) {
    return this.conversationsServices.findConversationById(id);
  }
}
