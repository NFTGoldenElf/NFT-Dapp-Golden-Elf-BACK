import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv'

dotenv.config();

const MONGO_URI_DB : string = process.env.MONGO_URI_DB;

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI_DB), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
