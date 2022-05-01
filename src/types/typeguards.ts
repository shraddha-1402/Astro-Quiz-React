import { FirebaseError } from "firebase/app";

export function isFBError(error: unknown): error is FirebaseError {
  try {
    if (
      (error as FirebaseError).message !== undefined &&
      (error as FirebaseError).message.startsWith("Firebase: Error")
    )
      return true;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
