import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import 'dotenv/config';
@Injectable()
export class RedisPubSubService {
  private readonly publisher: Redis;
  private readonly subscriber: Redis;

  constructor() {
    this.publisher = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
    this.subscriber = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
  }
}
