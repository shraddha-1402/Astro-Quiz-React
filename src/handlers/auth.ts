import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { auth, db } from "..";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ActionType, LocalRoutes } from "../constants";
import { AuthAction, LoginCreds, SignupCred } from "../types";
import { doc, setDoc } from "firebase/firestore";

const loginHandler = async ({
  credentials,
  authDispatch,
  navigate,
}: {
  credentials: LoginCreds;
  authDispatch: Dispatch<AuthAction>;
  navigate: NavigateFunction;
}): Promise<void> => {
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

const signupHandler = async ({
  credentials,
  navigate,
}: {
  credentials: SignupCred;
  navigate: NavigateFunction;
}): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = credentials;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await user.getIdToken();
    await setDoc(doc(db, "users", user.uid), { firstName, lastName, email });
    if (token) navigate(LocalRoutes.LOGIN_PAGE);
  } catch (error) {
    console.log(error);
  }
};

export { loginHandler, signupHandler };
