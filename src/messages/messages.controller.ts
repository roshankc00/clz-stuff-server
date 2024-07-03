import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TransformService } from './message.service';
import { CreateTransformDto } from './dto/create-transform.dto';
import { UpdateTransformDto } from './dto/update-message.dto';
import { Response } from 'express';
import { PaginataionDto } from './dto/find-all-message.dto';
import { JWtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Currentuser } from 'src/common/decorators/getCurrentUser.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly transformService: TransformService) {}

  @Post('talk')
  async talk(@Body('content') content: string) {
    return this.transformService.chat(content);
  }

  @UseGuards(JWtAuthGuard)
  @Post('speech')
  async speech(
    @Currentuser() user: User,
    @Body('text') text: string,
    @Res() res: Response,
  ) {
    return this.transformService.speech(text, res, user);
  }
  @Get()
  findAll(@Query('query') query: PaginataionDto) {
    return this.transformService.findAll(query);
  }
}
