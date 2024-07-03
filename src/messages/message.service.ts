import { Injectable } from '@nestjs/common';
import { CreateTransformDto } from './dto/create-transform.dto';
import { UpdateTransformDto } from './dto/update-message.dto';
import { TextToVoiceService } from 'src/common/textToSpeech/textToSpeech.service';
import { Response } from 'express';
import { GeminiService } from 'src/common/gemini/gimini.service';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { PaginataionDto } from './dto/find-all-message.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TransformService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly textToVoiceService: TextToVoiceService,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly entityManager: EntityManager,
  ) {}

  findAll(query: PaginataionDto) {
    return this.filter(query);
  }
  //todo: remove  just for test
  chat(content: string) {
    return this.geminiService.generateText(content);
  }
  async speech(text: string, res: Response, user: User) {
    const prompt = await this.geminiService.generateText(text);
    const request = {
      input: { text: prompt },
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
    const message = new Message({
      from: user,
    });
    await this.entityManager.save(message);
    res.send(audioContent);
  }

  async filter(query: PaginataionDto) {
    const { page, pageSize } = query;
    const totalItems = await this.messageRepository
      .createQueryBuilder()
      .getCount();
    const totalPages = Math.ceil(totalItems / pageSize);
    if (page && pageSize) {
      const queryBuilder = this.messageRepository.createQueryBuilder('message');
      const skip = (+page - 1) * +pageSize;

      return {
        messages: await queryBuilder
          .leftJoinAndSelect('message.from', 'from')
          .skip(+skip)
          .take(+pageSize)
          .getMany(),
        totalPage: totalPages,
        currentPage: +page,
      };
    } else {
      return this.messageRepository
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.from', 'from')
        .getMany();
    }
  }
}
