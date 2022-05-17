import { ActionType } from "../constants";
import { DataAction, DataState } from "../types";

const dataReducer = (state: DataState, action: DataAction): DataState => {
  const {
    SET_CURRENT_QUIZ,
    SET_CURRENT_QUESTION,
    SET_IS_QUIZ_SELECTED,
    SET_USER_SELECTED_ANSWERS,
    RESET_DATASTATE,
  } = ActionType;

  switch (action.type) {
    case SET_CURRENT_QUIZ:
      return {
        ...state,
        currentQuiz: action.payload.currentQuiz,
      };
    case SET_USER_SELECTED_ANSWERS:
      return {
        ...state,
        userSelectedAnswers: action.payload.userSelectedAnswers,
      };
    case SET_IS_QUIZ_SELECTED:
      return {
        ...state,
        isQuizSelected: action.payload.isQuizSelected,
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload.currentQuestion,
      };
    case RESET_DATASTATE:
      return {
        ...action.payload.state,
      };
    default:
      return state;
  }
};

export { dataReducer };
