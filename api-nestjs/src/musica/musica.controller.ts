import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MusicaService } from './musica.service';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';

@Controller('musica')
export class MusicaController {
  constructor(private readonly musicaService: MusicaService) { }

  @Post('fetch-and-save')
  fetchAndSaveArtists() {
    return this.musicaService.fetchAndSaveArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string) {
    return this.musicaService.findOne(id);
  }

  @Get()
  getAllArtists() {
    return this.musicaService.findAll();
  }

  @Get('artists')
  searchArtists(@Query('search') search: string) {
    return this.musicaService.searchArtists(search);
  }
}
