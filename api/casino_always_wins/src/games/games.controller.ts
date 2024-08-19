import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  @Post('create/:id')
  createGame(@Param('id') userId: string) {
    return this.gamesService.createGame(userId);
  }
  @Get()
  getAll() {
    return this.gamesService.getAllGames();
  }
  @Get('get/:id')
  getById(@Param('id') userId: string) {
    return this.gamesService.getGamesByUserId(userId);
  }
  @Get('/rating')
  getRating() {
    return this.gamesService.getAllUsersGamesRating();
  }
}
