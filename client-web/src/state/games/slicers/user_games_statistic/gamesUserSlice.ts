import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGame } from "../../../../interfaces/IGame";

export interface IUserAllGames {
  status: number;
  status_message: string;
  games: IGame[];
  gamesCount: number;
  gamesWinCount: number;
  gamesLoseCount: number;
  gamesWinRating: string;
}

export interface AllUserGameState {
  games: IUserAllGames | null;
  loading: boolean;
  error: string | null;
}

const initialState: AllUserGameState = {
  games: null,
  error: null,
  loading: false,
};

const gamesUserSlice = createSlice({
  name: "user/games",
  initialState,
  reducers: {
    userGamesRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    userGamesSuccess: (state, action: PayloadAction<IUserAllGames>) => {
      state.loading = false;
      state.games = action.payload;
      state.error = null;
    },
    userGamesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userGamesFailure, userGamesRequest, userGamesSuccess } =
  gamesUserSlice.actions;

export default gamesUserSlice.reducer;
