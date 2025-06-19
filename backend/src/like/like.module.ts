import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';

@Module({
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
})
export class LikeModule {}
