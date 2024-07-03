import { Module } from '@nestjs/common';
import { TransformService } from './transform.service';
import { TransformController } from './transform.controller';
import { TextToVoiceService } from 'src/common/textToSpeech/textToSpeech.service';
import { GeminiService } from 'src/common/gemini/gimini.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/transform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [TransformController],
  providers: [TransformService, GeminiService, TextToVoiceService],
})
export class TransformModule {}
