import { all, fork } from "redux-saga/effects";
import userSaga from "./user/user.saga";
import gameSaga from "./games/games.saga";

export function* rootSaga() {
  yield all([fork(userSaga), fork(gameSaga)]);
}
