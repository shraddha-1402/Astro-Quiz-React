import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage } from "./pages";
import { Navbar } from "./components";
import { LocalRoutes } from "./constants";
import { SignupPage } from "./pages/Auth";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <div className="bg-img">
      <Navbar />
      <main className="content-body">
        <Routes>
          <Route element={<HomePage />} path={LocalRoutes.HOME} />
          <Route element={<LoginPage />} path={LocalRoutes.LOGIN_PAGE} />
          <Route element={<SignupPage />} path={LocalRoutes.SIGNUP_PAGE} />
        </Routes>
        <ToastContainer
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={true}
          transition={Slide}
          theme="colored"
        />
      </main>
    </div>
  );
}

export default App;
