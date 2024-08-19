import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Games } from './games.entity';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Games]),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
