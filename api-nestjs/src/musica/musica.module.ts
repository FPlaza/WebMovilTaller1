import { Module } from '@nestjs/common';
import { MusicaService } from './musica.service';
import { MusicaController } from './musica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artista.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist])
  ],
  controllers: [MusicaController],
  providers: [MusicaService],
})
export class MusicaModule { }
