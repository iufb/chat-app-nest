import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantModule } from 'src/participant/participant.module';
import { UsersModule } from 'src/users/users.module';
import { Services } from 'src/utils/constants';
import { Conversation } from 'src/utils/typeorm';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    ParticipantModule,
    UsersModule,
  ],
  controllers: [ConversationsController],
  providers: [
    {
      provide: Services.CONVERSATIONS,
      useClass: ConversationsService,
    },
  ],
})
export class ConversationsModule {}
