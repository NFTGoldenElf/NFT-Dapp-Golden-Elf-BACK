import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import * as dotenv from 'dotenv'
import { ConfigModule } from '@nestjs/config';
import { NftsModule } from './nfts/nfts.module';

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI_DB),
    UsersModule,
    CloudinaryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    NftsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
