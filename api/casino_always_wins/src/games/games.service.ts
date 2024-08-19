import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './games.entity';
import { Users } from 'src/users/users.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Games)
    private gamesRepository: Repository<Games>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  private calcWinPercentage(gamesHistory) {
    const allGames = gamesHistory.length;
    const wonGames = gamesHistory.filter(
      (game) => game.gameResult === true,
    ).length;
    const winPercentage = (wonGames / allGames) * 100;
    return winPercentage;
  }

  private generateResult(allGames: number, winPercentage: number) {
    if (allGames < 5) {
      // Висока ймовірність отримати true для перших 5 ігор
      return Math.random() < 0.8; // 80% ймовірність
    }

    if (winPercentage < 50) {
      // Вища ймовірність перемоги, якщо відсоток перемог низький
      return Math.random() < 0.6; // 60% ймовірність
    }

    if (winPercentage < 69) {
      // 50 на 50 ймовірність для відсотка перемог менше 69
      return Math.random() < 0.5;
    }

    if (winPercentage < 80) {
      // Зниження ймовірності отримати true для відсотка перемог між 69% та 80%
      const adjustedProbability = 1 - (winPercentage - 69) / 100; // Наприклад, для 79% буде 0.9
      return Math.random() < adjustedProbability * 0.7; // Додаткове зниження ймовірності
    }

    // Суттєве зниження ймовірності для відсотків перемог більше 80%
    return Math.random() < 0.2; // 20% ймовірність
  }

  getAllGames() {
    return this.gamesRepository.find();
  }

  async createGame(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (user) {
      const gamesHistory = await this.gamesRepository.find({
        where: { userId: user.id },
      });

      const allGames = gamesHistory.length;
      const winPercentage = this.calcWinPercentage(gamesHistory);
      const gameResult = this.generateResult(allGames, winPercentage);

      const game = new Games();
      game.gameResult = gameResult;
      game.userId = user.id;
      game.userName = user.username;

      return this.gamesRepository.save(game);
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        status_message: 'User not found',
      });
    }
  }

  async getGamesByUserId(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        status_message: 'User not found',
      });
    }

    const games = await this.gamesRepository.find({
      where: { userId: userId },
    });

    if (games.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.OK, // Change to OK, as it's not an error
          status_message: "User hasn't played yet",
          games: [],
        },
        HttpStatus.OK,
      );
    }

    return {
      status: HttpStatus.OK,
      status_message: 'User has already played',
      games: games,
      gamesCount: games.length,
      gamesWinCount: games.filter((item) => item.gameResult !== false).length,
      gamesLoseCount: games.filter((item) => item.gameResult !== true).length,
      gamesWinRating:
        games.length < 5
          ? `User needs to play 5 games to get access to Win rating, played ${games.length}/5`
          : `${Math.round(this.calcWinPercentage(games) * 10) / 10}%`,
    };
  }

  async getAllUsersGamesRating() {
    const users = await this.usersRepository.find();

    const ratingArray = await Promise.all(
      users.map(async (user) => {
        try {
          const userGamesData = await this.getGamesByUserId(user.id);

          // Видаляємо поле 'games'
          const { games, ...userWithoutGames } = userGamesData;

          // Додаємо користувача у масив лише якщо у нього більше або дорівнює 5 ігор
          if (userWithoutGames.gamesCount >= 5) {
            // Перетворюємо gamesWinRating на число для сортування
            const numericWinRating = Number(
              userWithoutGames.gamesWinRating.replace('%', ''),
            );
            return {
              ...userWithoutGames,
              numericWinRating,
              username: user.username,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      }),
    );

    // Фільтруємо null значення, щоб виключити користувачів з менше ніж 5 іграми
    const filteredUsers = ratingArray.filter((user) => user !== null);

    // Сортуємо користувачів по рейтингу в порядку спадання
    filteredUsers.sort((a, b) => b.numericWinRating - a.numericWinRating);

    // Повертаємо gamesWinRating у форматі рядка з відсотком
    const finalArray = filteredUsers.map((user) => {
      return {
        ...user,
        gamesWinRating: `${user.numericWinRating}%`,
      };
    });

    return finalArray;
  }
}
