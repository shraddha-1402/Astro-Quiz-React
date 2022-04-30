import { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducers";
import { DefaultAuthValue } from "../types";

const AuthContext = createContext<DefaultAuthValue>({
  authState: { token: "", userInfo: { email: "", name: "" } },
  authDispatch: () => {},
});
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const localData = localStorage.getItem("data");
  const userData = localData ? JSON.parse(localData) : null;
  const [authState, authDispatch] = useReducer(authReducer, {
    token: userData ? userData.token : null,
    userInfo: userData ? userData.userInfo : {},
  });

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
