import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { TransformService } from './transform.service';
import { CreateTransformDto } from './dto/create-transform.dto';
import { UpdateTransformDto } from './dto/update-transform.dto';
import { Response } from 'express';

@Controller('messages')
export class TransformController {
  constructor(private readonly transformService: TransformService) {}

  @Post()
  create(@Body() createTransformDto: CreateTransformDto) {
    return this.transformService.create(createTransformDto);
  }

  @Post('talk')
  async talk(@Body('content') content: string) {
    return this.transformService.chat(content);
  }

  @Post('speech')
  async speech(@Body('text') text: string, @Res() res: Response) {
    return this.transformService.speech(text, res);
  }
  @Get()
  findAll() {
    return this.transformService.findAll();
  }
}
