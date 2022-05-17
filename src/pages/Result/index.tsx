import { useNavigate } from "react-router-dom";
import { LocalRoutes } from "../../constants";
import { useDynamicTitle } from "../../hooks";
import { useData } from "../../contexts";

const ResultsPage = () => {
  useDynamicTitle();
  const navigate = useNavigate();
  const {
    dataState: { isQuizSelected },
  } = useData();
  return (
    <div>
      {isQuizSelected ? (
        <>
          <h1 className="center-text">You Result will be displayed here</h1>
          <div className="flex-row justify-center mx-auto my-3-5">
            <button
              onClick={() => navigate(LocalRoutes.HOME, { replace: true })}
              className="btn btn-solid-primary"
            >
              Back To Home
            </button>
          </div>
        </>
      ) : (
        <div className="flex-col align-center">
          <h1 className="center-text my-2">You haven't played any quiz yet!</h1>

          <button
            className="btn btn-solid-primary"
            onClick={() => navigate(LocalRoutes.HOME, { replace: true })}
          >
            Explore Quizes
          </button>
        </div>
      )}
    </div>
  );
};

export { ResultsPage };
