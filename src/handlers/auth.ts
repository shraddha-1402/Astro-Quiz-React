import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase.config";
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
  setIsLoading,
}: {
  credentials: LoginCreds;
  authDispatch: Dispatch<AuthAction>;
  navigate: NavigateFunction;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}): Promise<void> => {
  try {
    setIsLoading(true);
    const { email, password } = credentials;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getDoc(doc(db, `users/${user.uid}`));
    if (userData.exists()) {
      const { firstName, lastName, email, scoreboard } = userData.data();
      const quizUserData = {
        token: await user.getIdToken(),
        userInfo: {
          email: email,
          name: `${firstName} ${lastName}`,
          scoreboard,
          userId: user.uid,
        },
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
  } finally {
    setIsLoading(false);
  }
};

const signupHandler = async ({
  credentials,
  navigate,
  setIsLoading,
}: {
  credentials: SignupCred;
  navigate: NavigateFunction;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}): Promise<void> => {
  try {
    setIsLoading(true);
    const { firstName, lastName, email, password } = credentials;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await user.getIdToken();
    if (token) {
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        scoreboard: [],
      });
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
  } finally {
    setIsLoading(false);
  }
};

const resetPasswordHandler = async ({
  email,
  navigate,
  setIsLoading,
}: {
  email: string;
  navigate: NavigateFunction;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setIsLoading(true);
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset link sent");
    navigate(LocalRoutes.LOGIN_PAGE);
  } catch (error) {
    if (isFBError(error))
      toast.error(`${error.code.split("/")[1].split("-").join(" ")}`);
  } finally {
    setIsLoading(false);
  }
};

export { loginHandler, signupHandler, resetPasswordHandler };
