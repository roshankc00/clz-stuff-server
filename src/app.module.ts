import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomLoggerModule } from './common/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomLoggerModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    MessageModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
