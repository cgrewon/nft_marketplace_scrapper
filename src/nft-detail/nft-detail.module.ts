import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { NftDetailService } from './nft-detail.service';
import { NftDetailController } from './nft-detail.controller';
import { AuthMiddleware } from 'src/middlewares/auth.middleware'

@Module({
  controllers: [NftDetailController],
  providers: [NftDetailService]
})

export class NftDetailModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(        
        { path: 'nft-detail', method: RequestMethod.POST },        
      )
  }
}
