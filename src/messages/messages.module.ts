import { Module } from '@nestjs/common';
import { TransformService } from './message.service';
import { TextToVoiceService } from 'src/common/textToSpeech/textToSpeech.service';
import { GeminiService } from 'src/common/gemini/gimini.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageController } from './messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [TransformService, GeminiService, TextToVoiceService],
})
export class MessageModule {}
