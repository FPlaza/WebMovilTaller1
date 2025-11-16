import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicaModule } from './musica/musica.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './musica/entities/artista.entity';

@Module({
  imports: [MusicaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'myuser',
      password: 'mypassword',
      database: 'musicdb',
      entities: [Artist],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
