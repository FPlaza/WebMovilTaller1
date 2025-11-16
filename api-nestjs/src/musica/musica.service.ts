import { Injectable } from '@nestjs/common';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';

@Injectable()
export class MusicaService {
  create(createMusicaDto: CreateMusicaDto) {
    return 'This action adds a new musica';
  }

  findAll() {
    return `This action returns all musica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} musica`;
  }

  update(id: number, updateMusicaDto: UpdateMusicaDto) {
    return `This action updates a #${id} musica`;
  }

  remove(id: number) {
    return `This action removes a #${id} musica`;
  }
}
