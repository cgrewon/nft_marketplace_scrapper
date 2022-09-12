import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftDetailModule } from './nft-detail/nft-detail.module';

@Module({
  imports: [NftDetailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
