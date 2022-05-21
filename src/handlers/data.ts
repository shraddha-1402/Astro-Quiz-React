import { Dispatch } from "react";
import { toast } from "react-toastify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { AuthAction, DataAction } from "../types";
import { ActionType } from "../constants";
import { isFBError } from "../types/typeguards";

const getQuizHandler = async ({
  quizId,
  dataDispatch,
  setIsLoading,
}: {
  quizId: string;
  dataDispatch: Dispatch<DataAction>;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setIsLoading(true);
    const response = await getDoc(doc(db, `quizes/${quizId}`));

    if (response.exists()) {
      const fbData = response.data() as {
        name: string;
        questions: {
          answerIndex: number;
          image: string;
          options: string[];
          question: string;
        }[];
      };

      const data = {
        name: fbData.name || "",
        questions: fbData.questions || [],
      };

      dataDispatch({
        type: ActionType.SET_CURRENT_QUIZ,
        payload: { currentQuiz: { ...data } },
      });
      dataDispatch({
        type: ActionType.SET_CURRENT_QUESTION,
        payload: { currentQuestion: 0 },
      });
      dataDispatch({
        type: ActionType.SET_IS_QUIZ_SELECTED,
        payload: { isQuizSelected: true },
      });
    }
  } catch (error) {
    if (isFBError(error))
      toast.error(`${error.code.split("/")[1].split("-").join(" ")}`);
  } finally {
    setIsLoading(false);
  }
};

const getUserScore = async ({
  userId,
  setIsLoading,
}: {
  userId: string;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setIsLoading(true);
    const fbData = await getDoc(doc(db, `users/${userId}`));
    const userData = fbData.data();
    if (!userData) throw new Error("!userData");
    return userData.scoreboard;
  } catch (error) {
    if (isFBError(error))
      toast.error(`${error.code.split("/")[1].split("-").join(" ")}`);
  } finally {
    setIsLoading(false);
  }
};

const setUserScore = async ({
  quizDetails,
  scoreboard,
  userId,
  authDispatch,
}: {
  quizDetails: { quizId: string; score: number; quizName: string };
  scoreboard: { quizId: string; score: number; quizName: string }[];
  userId: string;
  authDispatch: Dispatch<AuthAction>;
}) => {
  try {
    if (quizDetails.quizName !== "") {
      const docRef = doc(db, "users", userId);
      const res = await updateDoc(docRef, {
        scoreboard: [...scoreboard, quizDetails],
      });
      authDispatch({
        type: ActionType.SET_SCOREBOARD,
        payload: { scoreboard: [...scoreboard, quizDetails] },
      });
    }
  } catch (error) {
    if (isFBError(error))
      toast.error(`${error.code.split("/")[1].split("-").join(" ")}`);
  }
};

export { getQuizHandler, setUserScore, getUserScore };
