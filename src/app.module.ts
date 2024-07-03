import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BroadcastModule } from './broadcast/broadcast.module';
import { CustomLoggerModule } from './common/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './users/users.module';
import { NeighboursModule } from './neighbours/neighbours.module';
import { AuthModule } from './auth/auth.module';
import { TransformModule } from './transform/transform.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomLoggerModule,
    DatabaseModule,
    UsersModule,
    NeighboursModule,
    AuthModule,
    TransformModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
