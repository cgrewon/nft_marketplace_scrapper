import { Injectable } from '@nestjs/common';
const pkg = require('../package.json');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Health checking nft detail scrapping server... version:' + pkg.version;
  }
}
