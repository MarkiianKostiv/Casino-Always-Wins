import { AuthService } from "./auth.service";
import { call, CallEffect, PutEffect } from "redux-saga/effects";

const authService = new AuthService();
interface TokenStatus {
  validateToken: boolean;
  message: string;
}

function* withAuthCheck(
  saga: () => Generator<CallEffect<any> | PutEffect<any>, void, any>
): Generator<CallEffect<any> | PutEffect<any>, void, any> {
  try {
    const tokenStatus: TokenStatus = yield call([
      authService,
      authService.validateToken,
    ]);
    if (tokenStatus.validateToken) {
      return yield* saga();
    } else {
      throw new Error(tokenStatus.message);
    }
  } catch (error: any) {
    throw error;
  }
}

export { withAuthCheck };
