import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "..";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ActionType, LocalRoutes } from "../constants";
import { AuthAction, LoginCreds, SignupCred } from "../types";
import { doc, setDoc } from "firebase/firestore";
import { isFBError } from "../types/typeguards";

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
    toast.success("Logged in successfully!");
  } catch (error: unknown) {
    if (isFBError(error)) {
      switch (error.code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          toast.error("Wrong Credentials", { autoClose: 1500 });
          break;
        default:
          toast.error(`${error.code.split("/")[1].split("-").join(" ")}`);
          break;
      }
    } else console.error(error);
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
    if (token) {
      await setDoc(doc(db, "users", user.uid), { firstName, lastName, email });
      navigate(LocalRoutes.LOGIN_PAGE);
      toast.success("Signed up successfully!");
    }
  } catch (error) {
    if (isFBError(error)) {
      switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          toast.error("Email already registered", { autoClose: 2000 });
          break;
        default:
          toast.error(`${error.code.split("/")[1].split("-").join(" ")}`);
          break;
      }
    } else {
      console.log(error.code);
      toast.error("Something went wrong", { autoClose: 1500 });
    }
  }
};

export { loginHandler, signupHandler };
