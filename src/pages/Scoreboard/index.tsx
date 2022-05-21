import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useData, useLoader } from "../../contexts";
import { getUserScore } from "../../handlers";
import { ActionType, LocalRoutes, dataStateValue } from "../../constants";
import "./style.css";

const Scoreboard = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();
  const {
    authState: {
      userInfo: { scoreboard, userId },
    },
    authDispatch,
  } = useAuth();
  const { dataDispatch } = useData();

  useEffect(() => {
    dataDispatch({
      type: ActionType.RESET_DATASTATE,
      payload: {
        state: dataStateValue,
      },
    });

    (async () =>
      authDispatch({
        type: ActionType.SET_SCOREBOARD,
        payload: {
          scoreboard: await getUserScore({ userId, setIsLoading }),
        },
      }))();
  }, []);
  return (
    <div>
      <h1 className="center-text my-2">Your Scoreboard</h1>
      {scoreboard.map(({ quizId, score, quizName }, index) => {
        return (
          <div
            key={index}
            className=" container mx-auto  mw-28r score-card mb-1"
          >
            <div className="flex-col align-center gap-1">
              <h3 className="center-text">{quizName}</h3>
              <span
                className={
                  score > 20 ? "result-pass-badge" : "result-fail-badge"
                }
              >
                {score > 20 ? `${score} Pass` : `${score} Fail`}
              </span>
              <button
                className="btn btn-solid-primary"
                onClick={() => navigate(`${LocalRoutes.QUIZ_PAGE}/${quizId}`)}
              >
                Retake Quiz
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Scoreboard };
