import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoralisController } from './moralis/moralis.controller';

@Module({
  imports: [],
  controllers: [AppController, MoralisController],
  providers: [AppService],
})
export class AppModule {}
