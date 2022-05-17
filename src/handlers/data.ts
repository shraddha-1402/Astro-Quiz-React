import { Dispatch } from "react";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { DataAction } from "../types";
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

export { getQuizHandler };
