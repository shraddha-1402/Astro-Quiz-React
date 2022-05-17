import { useParams } from "react-router-dom";
import { FaHandPointRight } from "react-icons/fa";
import { useData, useLoader } from "../contexts";
import { getQuizHandler } from "../handlers";
import { useDynamicTitle } from "../hooks";
import { QuestionsPage } from "./Questions";
import { rules } from "../constants";

const RulesPage = () => {
  const {
    dataState: { isQuizSelected },
    dataDispatch,
  } = useData();
  const { setIsLoading } = useLoader();
  const { quizId } = useParams();
  useDynamicTitle();

  const handleStartClick = async () => {
    await getQuizHandler({
      quizId: quizId || "",
      dataDispatch,
      setIsLoading,
    });
  };

  return (
    <div>
      {!isQuizSelected ? (
        <>
          <h1 className="center-text my-2">Rules Before You Dive In</h1>
          <div className="container mx-auto mw-40r flex-col">
            <ul className="list-style-none">
              {rules.map((rule, index) => (
                <li key={index} className="m-1">
                  <FaHandPointRight className="mr-0-5" />
                  {rule}
                </li>
              ))}
            </ul>
            <div className="flex-row justify-center m-1">
              <button
                className="btn btn-solid-primary"
                onClick={handleStartClick}
              >
                Start Quiz
              </button>
            </div>
          </div>
          <p className="header-text">
            <i>Do Not Go Gentle Into That Goodnight.</i>~ Interstellar
          </p>
        </>
      ) : (
        <QuestionsPage />
      )}
    </div>
  );
};

export { RulesPage };
