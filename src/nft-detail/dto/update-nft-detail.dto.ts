import { PartialType } from '@nestjs/mapped-types';
import { CreateNftDetailDto } from './create-nft-detail.dto';

export class UpdateNftDetailDto extends PartialType(CreateNftDetailDto) {}
