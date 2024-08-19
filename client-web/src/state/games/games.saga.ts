import {
  call,
  put,
  takeEvery,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  gameRequest,
  gameFailure,
  gameSuccess,
} from "./slicers/run_game/gameSlice";
import { GamesService } from "./games.service";
import { IGame } from "../../interfaces/IGame";
import {
  IUserAllGames,
  userGamesFailure,
  userGamesRequest,
  userGamesSuccess,
} from "./slicers/user_games_statistic/gamesUserSlice";
import { IRating } from "../../interfaces/IRating";
import {
  ratingFailure,
  ratingRequest,
  ratingSuccess,
} from "./slicers/global_users_games_rating/globalRatingSlice";
import { withAuthCheck } from "../auth-service/auth.saga";

const game = new GamesService();

function* postGame(
  action: PayloadAction<string>
): Generator<
  CallEffect<IGame> | PutEffect<PayloadAction<IGame | string>>,
  void,
  IGame
> {
  yield* withAuthCheck(function* () {
    try {
      const data: IGame = yield call(game.runNewGame, action.payload);
      yield put(gameSuccess(data));
    } catch (error: any) {
      yield put(gameFailure(error.message));
    }
  });
}

function* getUserGames(
  action: PayloadAction<string>
): Generator<
  CallEffect<IUserAllGames> | PutEffect<PayloadAction<IUserAllGames | string>>,
  void,
  IUserAllGames
> {
  yield* withAuthCheck(function* () {
    try {
      const data: IUserAllGames = yield call(game.getUserGames, action.payload);
      yield put(userGamesSuccess(data));
    } catch (error: any) {
      yield put(userGamesFailure(error.message));
    }
  });
}

function* globalRating(): Generator<
  CallEffect<IRating[]> | PutEffect<PayloadAction<IRating[] | string>>,
  void,
  IRating[]
> {
  yield* withAuthCheck(function* () {
    try {
      const data: IRating[] = yield call(game.getGlobalRating);
      yield put(ratingSuccess(data));
    } catch (error: any) {
      yield put(ratingFailure(error.message));
    }
  });
}

function* watchFetchData(): Generator {
  yield takeEvery(gameRequest.type, postGame);
  yield takeEvery(userGamesRequest.type, getUserGames);
  yield takeEvery(ratingRequest.type, globalRating);
}

export default watchFetchData;
