import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicaModule } from './musica/musica.module';

@Module({
  imports: [MusicaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
