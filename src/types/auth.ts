import { Dispatch } from "react";
import { ActionType } from "../constants";

type LoginCreds = {
  email: string;
  password: string;
};

type SignupCred = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type AuthState = {
  token: string | null;
  userInfo: {
    email: string | null;
    name: string | null;
    scoreboard: { quizId: string; score: number; quizName: string }[];
    userId: string;
  };
};

type DefaultAuthValue = {
  authState: AuthState;
  authDispatch: Dispatch<AuthAction>;
};

interface LoginAction {
  type: ActionType.USER_LOGIN;
  payload: AuthState;
}

interface LogoutAction {
  type: ActionType.USER_LOGOUT;
}

interface ScoreboardAction {
  type: ActionType.SET_SCOREBOARD;
  payload: {
    scoreboard: { quizId: string; score: number; quizName: string }[];
  };
}

type AuthAction = LoginAction | LogoutAction | ScoreboardAction;

export type { AuthState, DefaultAuthValue, AuthAction, LoginCreds, SignupCred };
