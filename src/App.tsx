import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { HomePage, LoginPage, SignupPage, ProfilePage } from "./pages";
import { Navbar, PrivateRoute } from "./components";
import { LocalRoutes } from "./constants";

function App() {
  return (
    <div className="bg-img">
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
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
            path={LocalRoutes.PROFILE_PAGE}
          />
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
