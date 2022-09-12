import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NftDetailService } from './nft-detail.service';
import { CreateNftDetailDto } from './dto/create-nft-detail.dto';
import { UpdateNftDetailDto } from './dto/update-nft-detail.dto';

@Controller('nft-detail')
export class NftDetailController {
  constructor(private readonly nftDetailService: NftDetailService) {}

  @Post()
  create(
    @Query('tokenId') tokenId: string,
    @Query('tokenAddr') tokenAddr: string,
  ) {
    return this.nftDetailService.scrapping(tokenId, tokenAddr);
  }

}
