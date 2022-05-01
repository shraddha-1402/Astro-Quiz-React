import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ActionType, LocalRoutes } from "../../constants";
import { useAuth } from "../../contexts";

const ProfilePage = () => {
  const {
    authState: { userInfo },
    authDispatch,
  } = useAuth();

  const navigate = useNavigate();
  const { name, email } = userInfo;
  const handleLogout = () => {
    authDispatch({ type: ActionType.USER_LOGOUT });
    navigate(LocalRoutes.HOME);
    toast.success("Logged Out");
  };

  return (
    <main className="container mw-28r my-3-5 mx-auto flex-col align-center">
      <h1 className="center-text m-1">Profile</h1>
      <div className="my-1-5 w-100p">
        <p className="my-0-5">
          <span className="disp-inline-block w-30p mr-0-5">Full Name:</span>
          {name}
        </p>
        <p className="my-0-5">
          <span className="disp-inline-block w-30p mr-0-5">Email:</span>
          {email}
        </p>
      </div>

      <div className="flex-row gap-1 mt-1">
        <button
          className="btn btn-solid-primary mt-1"
          onClick={() => navigate(LocalRoutes.HOME)}
        >
          Back To Home
        </button>
        <button className="btn btn-solid-danger mt-1" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </main>
  );
};

export { ProfilePage };
