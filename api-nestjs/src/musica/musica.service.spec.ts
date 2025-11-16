import { Test, TestingModule } from '@nestjs/testing';
import { MusicaService } from './musica.service';

describe('MusicaService', () => {
  let service: MusicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicaService],
    }).compile();

    service = module.get<MusicaService>(MusicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
