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

enum LocalRoutes {
  HOME = "/",
  LOGIN_PAGE = "/login-page",
  SIGNUP_PAGE = "/signup-page",
  FORGOT_PASSWORD_PAGE = "/forgot-password-page",
  PROFILE_PAGE = "/profile-page",
  QUIZ_PAGE = "/quiz-page",
}

enum TestCredentials {
  email = "test.astroquiz@gmail.com",
  password = "test@1234",
}

enum ActionType {
  USER_LOGIN = "USER_LOGIN",
  USER_LOGOUT = "USER_LOGOUT",
  SET_CURRENT_QUIZ = "SET_CURRENT_QUIZ",
  SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION",
  SET_USER_SELECTED_ANSWERS = "SET_USER_SELECTED_ANSWERS",
  SET_IS_QUIZ_SELECTED = "SET_IS_QUIZ_SELECTED",
  RESET_DATASTATE = "RESET_DATASTATE",
}

export { LocalRoutes, TestCredentials, ActionType };
export { dataStateValue };
