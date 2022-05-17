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

type AuthAction = LoginAction | LogoutAction;

export type { AuthState, DefaultAuthValue, AuthAction, LoginCreds, SignupCred };
