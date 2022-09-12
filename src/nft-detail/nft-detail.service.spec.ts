import { Test, TestingModule } from '@nestjs/testing';
import { NftDetailService } from './nft-detail.service';

describe('NftDetailService', () => {
  let service: NftDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftDetailService],
    }).compile();

    service = module.get<NftDetailService>(NftDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
