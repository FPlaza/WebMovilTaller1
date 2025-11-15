import { Module } from '@nestjs/common';
import { MusicController } from './music/music.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MusicController],
})
export class AppModule {}