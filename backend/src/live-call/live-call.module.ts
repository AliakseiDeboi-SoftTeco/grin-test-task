import { Module } from '@nestjs/common';
import { LiveCallService } from './live-call.service';
import { LiveCallRepository } from './live-call.repository';
import { LiveCallController } from './live-call.controller';

@Module({
  controllers: [LiveCallController],
  providers: [LiveCallService, LiveCallRepository],
})
export class LiveCallModule {}
