import { ActionType } from "../constants";
import { AuthState, AuthAction } from "../types";

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case ActionType.USER_LOGIN:
      return {
        token: action.payload.token,
        userInfo: action.payload.userInfo,
      };
    case ActionType.USER_LOGOUT:
      localStorage.clear();
      return {
        token: null,
        userInfo: { email: "", name: "" },
      };
    default:
      return state;
  }
};

export { authReducer };
