import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "..";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ActionType, LocalRoutes } from "../constants";
import { AuthAction, LoginCreds, SignupCred } from "../types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { isFBError } from "../types/typeguards";
import { FirebaseError } from "firebase/app";

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
    const userData = await getDoc(doc(db, `users/${user.uid}`));
    if (userData.exists()) {
      const { firstName, lastName, email } = userData.data();
      const quizUserData = {
        token: await user.getIdToken(),
        userInfo: { email: email, name: `${firstName} ${lastName}` },
      };
      authDispatch({
        type: ActionType.USER_LOGIN,
        payload: quizUserData,
      });
      localStorage.setItem("quizUserData", JSON.stringify(quizUserData));
      navigate(LocalRoutes.HOME);
      toast.success("Logged in successfully!");
    } else
      throw new FirebaseError(
        "auth/User-data-does-not-exists",
        "Firebase: Error"
      );
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
      console.log(error);
      toast.error("Something went wrong", { autoClose: 1500 });
    }
  }
};

const resetPasswordHandler = async ({
  email,
  navigate,
}: {
  email: string;
  navigate: NavigateFunction;
}) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset link sent");
    navigate(LocalRoutes.LOGIN_PAGE);
  } catch (error) {
    if (isFBError(error))
      toast.error(`${error.code.split("/")[1].split("-").join(" ")}`);
  }
};

export { loginHandler, signupHandler, resetPasswordHandler };
