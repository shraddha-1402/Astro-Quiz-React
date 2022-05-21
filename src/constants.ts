const dataStateValue = {
  currentQuiz: {
    name: "",
    questions: [
      {
        question: "",
        image: "",
        options: [],
        answerIndex: -1,
      },
    ],
  },
  userSelectedAnswers: [],
  isQuizSelected: false,
  currentQuestion: -1,
};

const rules = [
  "This quiz has 5 questions",
  "Each question has only one correct answer",
  "You will get 30 seconds to answer each question",
  "Once you click next you will not be able to go back to the previous question",
  "For each correct answer you will be awarded 10 points",
  "To win you need to score more than 20 points",
];

enum LocalRoutes {
  HOME = "/",
  LOGIN_PAGE = "/login-page",
  SIGNUP_PAGE = "/signup-page",
  FORGOT_PASSWORD_PAGE = "/forgot-password-page",
  PROFILE_PAGE = "/profile-page",
  QUIZ_PAGE = "/quiz-page",
  RESULT_PAGE = "/result-page",
  SCOREBOARD_PAGE = "/scoreboard",
}

enum TestCredentials {
  email = "test.astroquiz@gmail.com",
  password = "test@1234",
}

enum ActionType {
  USER_LOGIN = "USER_LOGIN",
  USER_LOGOUT = "USER_LOGOUT",
  SET_SCOREBOARD = "SET_SCOREBOARD",
  SET_CURRENT_QUIZ = "SET_CURRENT_QUIZ",
  SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION",
  SET_USER_SELECTED_ANSWERS = "SET_USER_SELECTED_ANSWERS",
  SET_IS_QUIZ_SELECTED = "SET_IS_QUIZ_SELECTED",
  RESET_DATASTATE = "RESET_DATASTATE",
}

export { LocalRoutes, TestCredentials, ActionType };
export { dataStateValue, rules };
