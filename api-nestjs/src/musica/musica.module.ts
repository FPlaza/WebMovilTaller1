import { Module } from '@nestjs/common';
import { MusicaService } from './musica.service';
import { MusicaController } from './musica.controller';

@Module({
  controllers: [MusicaController],
  providers: [MusicaService],
})
export class MusicaModule {}
