import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../../components";
import { resetPasswordHandler } from "../../handlers";
import { LocalRoutes } from "../../constants";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handlePasswordRestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetPasswordHandler({ email, navigate });
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  return (
    <main className="card mw-28r p-1 my-3-5 mx-auto">
      <h1 className="center-text my-0-5">Forgotten Password</h1>
      <div className="m-1">
        <form onSubmit={handlePasswordRestSubmit} className="my-1-5">
          <FormInput
            placeholder="Enter Email"
            type="email"
            value={email}
            name="email"
            changeHandler={handleInputChange}
          />
          <button
            type="submit"
            className="btn btn-solid-primary w-100p text-bold-weight"
          >
            Send Reset Link
          </button>
        </form>
        <p className="sm-text mt-1">
          Remember Password?
          <Link
            to={LocalRoutes.LOGIN_PAGE}
            className="link ml-0-25 text-bold-weight"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export { ForgotPassword };
