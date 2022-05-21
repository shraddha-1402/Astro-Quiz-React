import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  HomePage,
  LoginPage,
  SignupPage,
  ProfilePage,
  ForgotPassword,
  PageNotFound,
  RulesPage,
  ResultsPage,
  Scoreboard,
} from "./pages";
import { Navbar, PrivateRoute, Loader } from "./components";
import { useLoader } from "./contexts";
import { LocalRoutes } from "./constants";

function App() {
  const { isLoading } = useLoader();

  return (
    <div className="bg-img">
      <div> {isLoading && <Loader />} </div>
      <Navbar />
      <main className="content-body">
        <Routes>
          <Route element={<HomePage />} path={LocalRoutes.HOME} />
          <Route
            element={
              <PrivateRoute isAuthRoute={true}>
                <LoginPage />
              </PrivateRoute>
            }
            path={LocalRoutes.LOGIN_PAGE}
          />
          <Route
            element={
              <PrivateRoute isAuthRoute={true}>
                <SignupPage />
              </PrivateRoute>
            }
            path={LocalRoutes.SIGNUP_PAGE}
          />
          <Route
            element={
              <PrivateRoute isAuthRoute={true}>
                <ForgotPassword />
              </PrivateRoute>
            }
            path={LocalRoutes.FORGOT_PASSWORD_PAGE}
          />
          <Route
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
            path={LocalRoutes.PROFILE_PAGE}
          />
          <Route
            element={
              <PrivateRoute>
                <RulesPage />
              </PrivateRoute>
            }
            path={`${LocalRoutes.QUIZ_PAGE}/:quizId`}
          />
          <Route
            element={
              <PrivateRoute>
                <ResultsPage />
              </PrivateRoute>
            }
            path={`${LocalRoutes.RESULT_PAGE}/:quizId`}
          />
          <Route
            element={
              <PrivateRoute>
                <Scoreboard />
              </PrivateRoute>
            }
            path={LocalRoutes.SCOREBOARD_PAGE}
          />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
        <ToastContainer
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={true}
          transition={Slide}
          theme="colored"
          position={"bottom-right"}
        />
      </main>
    </div>
  );
}

export default App;
