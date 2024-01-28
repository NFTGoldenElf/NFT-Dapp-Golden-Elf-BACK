import { Module } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [NftsService, ConfigService],
  controllers: [NftsController]
})
export class NftsModule { }
