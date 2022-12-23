import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils/constants';
import { Participant } from 'src/utils/typeorm';
import { ParticipantService } from './participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: [
    {
      provide: Services.PARTICIPANTS,
      useClass: ParticipantService,
    },
  ],
  exports: [
    {
      provide: Services.PARTICIPANTS,
      useClass: ParticipantService,
    },
  ],
})
export class ParticipantModule {}
