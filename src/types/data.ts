import { Dispatch } from "react";
import { ActionType } from "../constants";

type DataState = {
  currentQuiz: {
    name: string;
    questions: {
      question: string;
      image: string;
      options: string[];
      answerIndex: number;
    }[];
  };
  currentQuestion: number;
  userSelectedAnswers: number[];
  isQuizSelected: boolean;
};

interface QuizSelectedAction {
  type: ActionType.SET_IS_QUIZ_SELECTED;
  payload: {
    isQuizSelected: boolean;
  };
}

interface CurrentQuizAction {
  type: ActionType.SET_CURRENT_QUIZ;
  payload: {
    currentQuiz: {
      name: string;
      questions: {
        question: string;
        image: string;
        options: string[];
        answerIndex: number;
      }[];
    };
  };
}

interface CurrentQuestionAction {
  type: ActionType.SET_CURRENT_QUESTION;
  payload: {
    currentQuestion: number;
  };
}

interface SelectedAnswers {
  type: ActionType.SET_USER_SELECTED_ANSWERS;
  payload: {
    userSelectedAnswers: number[];
  };
}

interface ResetDatastate {
  type: ActionType.RESET_DATASTATE;
  payload: {
    state: DataState;
  };
}

type DataAction =
  | CurrentQuizAction
  | QuizSelectedAction
  | CurrentQuestionAction
  | SelectedAnswers
  | ResetDatastate;

type DefaultData = {
  dataState: DataState;
  dataDispatch: Dispatch<DataAction>;
};

export type { DataState, DataAction, DefaultData };
