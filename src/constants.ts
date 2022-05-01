enum LocalRoutes {
  HOME = "/",
  LOGIN_PAGE = "/login-page",
  SIGNUP_PAGE = "/signup-page",
  FORGOT_PASSWORD_PAGE = "/forgot-password-page",
  PROFILE_PAGE = "/profile-page",
}

enum TestCredentials {
  email = "test.astroquiz@gmail.com",
  password = "test@1234",
}

enum ActionType {
  USER_LOGIN = "USER_LOGIN",
  USER_LOGOUT = "USER_LOGOUT",
}

export { LocalRoutes, TestCredentials, ActionType };
