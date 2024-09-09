import { createSlice } from "@reduxjs/toolkit";
import { IGame } from "../../../../interfaces/IGame";
export interface GameState {
  game: null | IGame;
  loading: boolean;
  error: null | string;
}
const initialState: GameState = {
  game: null,
  error: null,
  loading: false,
};
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    gameRequest: (state, _action) => {
      state.loading = true;
      state.error = null;
    },
    gameSuccess: (state, action) => {
      state.loading = false;
      state.game = action.payload;
      state.error = null;
    },
    gameFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { gameRequest, gameSuccess, gameFailure } = gameSlice.actions;

export default gameSlice.reducer;
