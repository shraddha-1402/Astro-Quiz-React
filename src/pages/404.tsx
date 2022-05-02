import { useNavigate } from "react-router-dom";
import { LocalRoutes } from "../constants";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-col align-center gap-1">
      <h1 className="center-text m-1">404 Page Not Found</h1>
      <p>Oops the page you were looking for does not exists</p>
      <button
        className="btn btn-solid-primary"
        onClick={() => navigate(LocalRoutes.HOME)}
      >
        Back to Home
      </button>
    </div>
  );
};

export { PageNotFound };
