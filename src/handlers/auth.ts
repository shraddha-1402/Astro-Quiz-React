import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { auth } from "..";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ActionType, LocalRoutes } from "../constants";
import { AuthAction, LoginCreds, SignupCred } from "../types";

const loginHandler = async ({
  credentials,
  authDispatch,
  navigate,
}: {
  credentials: LoginCreds;
  authDispatch: Dispatch<AuthAction>;
  navigate: NavigateFunction;
}) => {
  try {
    const { email, password } = credentials;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    authDispatch({
      type: ActionType.USER_LOGIN,
      payload: {
        token: await user.getIdToken(),
        userInfo: { email: user.email, name: user.displayName },
      },
    });
    navigate(LocalRoutes.HOME);
  } catch (error) {
    console.error(error);
  }
};

export { loginHandler };
