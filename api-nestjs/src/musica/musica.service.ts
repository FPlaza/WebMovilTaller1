import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Artist } from './entities/artista.entity';

@Injectable()
export class MusicaService {
  constructor(
    @InjectRepository(Artist)
    private artistRepo: Repository<Artist>,
  ) { }

  async fetchAndSaveArtists() {
    const artistas = [
      "The Beatles", "Queen", "Michael Jackson", "Madonna", "Elton John",
      "David Bowie", "Prince", "Whitney Houston", "Bob Marley",
      "Rolling Stones", "Pink Floyd", "Coldplay", "Adele",
      "Taylor Swift", "Ed Sheeran", "Bruno Mars",
    ];

    for (const nombre of artistas) {
      const response = await fetch(
        `https://theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(nombre)}`
      );

      const data = await response.json();
      const info = data.artists?.[0];

      if (!info) {
        console.warn(`No se encontró el artista: ${nombre}`);
        continue;
      }

      const existe = await this.artistRepo.findOne({
        where: { idArtist: info.idArtist },
      });
      if (existe) continue;

      const artist = this.artistRepo.create({
        idArtist: info.idArtist,
        strArtist: info.strArtist,
        strArtistThumb: info.strArtistThumb,
        strCountry: info.strCountry,
        strGender: info.strGender,
      });

      await this.artistRepo.save(artist);
    }

    return 'Datos guardados en PostgreSQL';
  }

  async findOne(id: string): Promise<Artist | null> {
    return this.artistRepo.findOne({ where: { idArtist: id } });
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepo.find();
  }

  async searchArtists(search: string): Promise<Artist[]> {
    if (!search || search.trim() === "") {
      return this.artistRepo.find();
    }

    return this.artistRepo.find({
      where: [
        { strArtist: ILike(`%${search}%`) },
        { strCountry: ILike(`%${search}%`) },
        { strGender: ILike(`%${search}%`) }
      ]
    });
  }

}
