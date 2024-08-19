import { call, put, takeEvery } from "redux-saga/effects";
import {
  registerRequest,
  registerFailure,
  registerSuccess,
  loginRequest,
  loginFailure,
  loginSuccess,
  getUserDataRequest,
  getUserDataFailure,
  getUserDataSuccess,
  updateFailure,
  updateRequest,
  updateSuccess,
} from "./userSlice";
import { UserService } from "./user.service";
import { withAuthCheck } from "../auth-service/auth.saga";

const user = new UserService();

interface RegistrationData {
  email: string;
  username: string;
  password: string;
}
interface LoginData {
  email: string;
  pass: string;
}

interface FetchRequestAction {
  type: string;
  payload: RegistrationData;
}
interface FetchRequestAction2 {
  type: string;
  payload: LoginData;
}
interface FetchRequestAction3 {
  type: string;
  payload: { id: string | undefined; username: string };
}

interface FetchSuccessAction {
  type: string;
  payload: any;
}

interface FetchFailureAction {
  type: string;
  payload: string;
}

function* registerUser(action: FetchRequestAction): Generator<any, void, any> {
  try {
    const data: any = yield call(user.registerUser, action.payload);
    yield put<FetchSuccessAction>(registerSuccess(data));
  } catch (error: any) {
    yield put<FetchFailureAction>(registerFailure(error.message));
  }
}

function* loginUser(action: FetchRequestAction2): Generator<any, void, any> {
  try {
    const data: any = yield call(user.loginUser, action.payload);
    yield put<FetchSuccessAction>(loginSuccess(data));
  } catch (error: any) {
    yield put<FetchFailureAction>(loginFailure(error.message));
  }
}

function* getUserData(): Generator<any, void, any> {
  yield* withAuthCheck(function* () {
    try {
      const data: any = yield call(user.getUserData);
      yield put<FetchSuccessAction>(getUserDataSuccess(data));
    } catch (error: any) {
      yield put<FetchFailureAction>(getUserDataFailure(error.message));
    }
  });
}

function* updateUser(action: FetchRequestAction3): Generator<any, void, any> {
  yield* withAuthCheck(function* () {
    try {
      const data: any = yield call(user.upDateUserInfo, action.payload);
      yield put<FetchSuccessAction>(updateSuccess(data));
    } catch (error: any) {
      yield put<FetchFailureAction>(updateFailure(error.message));
    }
  });
}

function* watchFetchData(): Generator<any, void, any> {
  yield takeEvery(registerRequest.type, registerUser);
  yield takeEvery(loginRequest.type, loginUser);
  yield takeEvery(getUserDataRequest.type, getUserData);
  yield takeEvery(updateRequest.type, updateUser);
}

export default watchFetchData;
