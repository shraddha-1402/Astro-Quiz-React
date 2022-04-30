import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage } from "./pages";
import { Navbar } from "./components";
import { LocalRoutes } from "./constants";
import { SignupPage } from "./pages/Auth";

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
      </main>
    </div>
  );
}

export default App;
