import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "./user/userSlice";
import gameReducer from "./games/slicers/run_game/gameSlice";
import userGamesReducer from "./games/slicers/user_games_statistic/gamesUserSlice";
import globalRatingReducer from "./games/slicers/global_users_games_rating/globalRatingSlice";
import uiReducer from "./ui_helpers/helpers.slice";
import { rootSaga } from "./root.saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    userGames: userGamesReducer,
    globalRating: globalRatingReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
