import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Router, Services } from 'src/utils/constants';
import { IConversations } from './conversations';
import { CreateConversationDto } from './dtos/CreateConversationDto';

@Controller(Router.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsServices: IConversations,
  ) {}
  @Post()
  createConversation(@Body() createPayload: CreateConversationDto) {
    this.conversationsServices.createConversation();
    console.log(createPayload);
  }
}
