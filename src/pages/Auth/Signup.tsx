import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { FormInput } from "../../components";
import { LocalRoutes } from "../../constants";
import { SignupCred } from "../../types/auth";
import { signupHandler } from "../../handlers";

const SignupPage = () => {
  const [
    { firstName, lastName, email, password },
    setSignupCredentials,
  ] = useState<SignupCred>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignupCredentials((signupCredentials) => ({
      ...signupCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const handleSignupSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signupHandler({
      credentials: { firstName, lastName, email, password },
      navigate,
    });
  };

  return (
    <main className="card mw-28r p-1 my-3-5 mx-auto">
      <h1 className="center-text my-0-5">Signup</h1>
      <div className="m-1">
        <form onSubmit={handleSignupSubmit}>
          <FormInput
            type="text"
            minLength={3}
            placeholder="Enter FirstName eg:Jon"
            value={firstName}
            name="firstName"
            changeHandler={handleInputChange}
          />

          <FormInput
            type="text"
            minLength={3}
            placeholder="Enter LastName eg:Doe"
            value={lastName}
            name="lastName"
            changeHandler={handleInputChange}
          />

          <FormInput
            type="email"
            value={email}
            placeholder="Enter Email eg:abc@gmail.com"
            name="email"
            changeHandler={handleInputChange}
          />

          <div className="pos-rel w-100p my-1">
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
          </div>

          <div className="my-1">
            <input type="checkbox" id="term-and-condition" required />
            <label className="ml-0-25" htmlFor="term-and-condition">
              I accept all
              <a href="#" target="_blank" className="link ml-0-25">
                Terms and Conditions<span className="red-text">*</span>
              </a>
            </label>
          </div>

          <button className="btn btn-solid-primary w-100p my-0-25 mt-1 text-bold-weight">
            SIGNUP
          </button>
        </form>

        <p className="sm-text my-0-5">
          Alredy have an account?
          <Link
            to={LocalRoutes.LOGIN_PAGE}
            className=" ml-0-25 link text-bold-weight"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export { SignupPage };