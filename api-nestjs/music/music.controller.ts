import { Controller, Get, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('music')
export class MusicController {
  constructor(private readonly httpService: HttpService) {}

  @Get('artists')
  async getArtists(@Query('search') search?: string) {
    const artists = ["The Beatles", "Queen", "Michael Jackson", "Madonna"];
    
    if (search) {
      // Buscar artista específico
      try {
        const response = await firstValueFrom(
          this.httpService.get(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${search}`)
        );
        return response.data.artists || [];
      } catch (error) {
        return [];
      }
    }

    // Devolver artistas por defecto
    const artistsData = [];
    for (const artist of artists) {
      try {
        const response = await firstValueFrom(
          this.httpService.get(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`)
        );
        if (response.data.artists && response.data.artists[0]) {
          artistsData.push(response.data.artists[0]);
        }
      } catch (error) {
        console.log(`Error con ${artist}:`, error);
      }
    }
    return artistsData;
  }
}