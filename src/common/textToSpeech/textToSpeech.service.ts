import { Injectable } from '@nestjs/common';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { response } from 'express';
@Injectable()
export class TextToVoiceService {
  private client: TextToSpeechClient;
  constructor() {
    this.client = new TextToSpeechClient();
  }
  async synthesizeSpeech(reqBody: any) {
    const [response] = await this.client.synthesizeSpeech(reqBody);
    return response.audioContent;
  }
}
