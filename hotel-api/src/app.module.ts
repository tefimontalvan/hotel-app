import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { databaseConfig } from './config/databaseConfig';
import { AuthModule } from './auth/auth.module';
import { HistoryModule } from './history/history.module';
import { RoomModule } from './room/room.module';
import { PictureModule } from './picture/picture.module';
import { ExtraServiceModule } from './extraService/extraService.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...databaseConfig }),
    ClientModule,
    AuthModule,
    HistoryModule,
    RoomModule,
    PictureModule,
    ExtraServiceModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
