import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: any;
  private geminiPro: any;
  private geminiProVision: any;
  constructor(private readonly configService: ConfigService) {
    this.genAI = new GoogleGenerativeAI(
      this.configService.get('GIMINI_API_KEY'),
    );
    this.geminiPro = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.geminiProVision = this.genAI.getGenerativeModel({
      model: 'gemini-pro-vision',
    });
  }
  async generateText(prompt: string): Promise<string> {
    const result = await this.geminiPro.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }
}
