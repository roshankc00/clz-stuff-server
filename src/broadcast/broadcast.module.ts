import { Module } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';
import { BroadcastGateway } from './broadcast.gateway';

@Module({
  providers: [BroadcastGateway, BroadcastService],
})
export class BroadcastModule {}
