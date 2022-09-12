import { Test, TestingModule } from '@nestjs/testing';
import { NftDetailController } from './nft-detail.controller';
import { NftDetailService } from './nft-detail.service';

describe('NftDetailController', () => {
  let controller: NftDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftDetailController],
      providers: [NftDetailService],
    }).compile();

    controller = module.get<NftDetailController>(NftDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
