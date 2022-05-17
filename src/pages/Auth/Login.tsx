import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { FormInput } from "../../components";
import { loginHandler } from "../../handlers";
import { useAuth, useLoader } from "../../contexts";
import { LoginCreds } from "../../types";
import { LocalRoutes, TestCredentials } from "../../constants";
import "./style.css";
import { useDynamicTitle } from "../../hooks";

const LoginPage = () => {
  const [{ email, password }, setLoginCredentials] = useState<LoginCreds>({
    email: "",
    password: "",
  });
  const { setIsLoading } = useLoader();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials((loginCredentials) => ({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  const navigate = useNavigate();
  const { authDispatch } = useAuth();
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginHandler({
      credentials: { email, password },
      authDispatch,
      navigate,
      setIsLoading,
    });
  };

  useDynamicTitle();

  return (
    <main className="card mw-28r p-1 my-3-5 mx-auto">
      <h1 className="center-text my-0-5">Login</h1>
      <div className="m-1">
        <form onSubmit={handleLoginSubmit}>
          <FormInput
            placeholder="Enter Email"
            type="email"
            value={email}
            name="email"
            changeHandler={handleInputChange}
          />
          <div className="pos-rel w-100p my-1-5">
            <input
              placeholder="Enter Password"
              className="input std-input mb-0-5 "
              type={showPassword ? "text" : "password"}
              value={password}
              name="password"
              onChange={handleInputChange}
              autoComplete="off"
            />
            <span
              className="show-password-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>

            <Link to={LocalRoutes.FORGOT_PASSWORD_PAGE} className="link">
              <span className="sm-text">Forgotten Password?</span>
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-solid-secondary w-100p my-0-25 mt-1 text-bold-weight"
            onClick={() => setLoginCredentials(TestCredentials)}
          >
            Fill Test Credentials
          </button>

          <button
            type="submit"
            className="btn btn-solid-primary w-100p my-0-25 mt-1 text-bold-weight"
          >
            LOGIN
          </button>
        </form>

        <p className="sm-text my-0-5">
          Do not have an account yet?
          <Link
            to={LocalRoutes.SIGNUP_PAGE}
            className="link ml-0-25 text-bold-weight"
          >
            SignUp
          </Link>
        </p>
      </div>
    </main>
  );
};

export { LoginPage };
