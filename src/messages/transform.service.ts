import { Injectable } from '@nestjs/common';
import { CreateTransformDto } from './dto/create-transform.dto';
import { UpdateTransformDto } from './dto/update-transform.dto';
import { TextToVoiceService } from 'src/common/textToSpeech/textToSpeech.service';
import { Response } from 'express';
import { GeminiService } from 'src/common/gemini/gimini.service';

@Injectable()
export class TransformService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly textToVoiceService: TextToVoiceService,
  ) {}
  create(createTransformDto: CreateTransformDto) {}

  findAll() {
    return `This action returns all transform`;
  }
  chat(content: string) {
    return this.geminiService.generateText(content);
  }
  async speech(text: string, res: Response) {
    // const gptResponse = await this.gptService.chatWithchchatGpt(text);
    const request = {
      input: { text: text },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    const audioContent =
      await this.textToVoiceService.synthesizeSpeech(request);
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'attachment; filename="output.mp3"',
      'Content-Length': audioContent.length,
    });
    res.send(audioContent);
  }
}
