import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocalRoutes } from "../../constants";
import { useAuth, useData } from "../../contexts";
import { setUserScore } from "../../handlers/data";
import { useDynamicTitle } from "../../hooks";
import "./style.css";

const ResultsPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  useDynamicTitle();

  const {
    dataState: {
      userSelectedAnswers,
      isQuizSelected,
      currentQuiz: { questions, name },
    },
  } = useData();
  const {
    authState: {
      userInfo: { scoreboard, userId },
    },
    authDispatch,
  } = useAuth();

  const getClass = (
    index: number,
    answerIndex: number,
    selectedAnswer: number
  ) => {
    if (index === answerIndex)
      return "option-label pointer-event-none checked-right";
    else if (index === selectedAnswer)
      return "option-label pointer-event-none checked-wrong";
    else return "option-label pointer-event-none";
  };

  const [result, setResult] = useState({
    score: 0,
    message: "",
  });

  useEffect(() => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.answerIndex === userSelectedAnswers[index]) score += 10;
    });
    if (score > 20)
      setResult({ score, message: "Congratulations! You won the quiz 🎉🎉" });
    else setResult({ score, message: "Oops! Better luck next time!" });
    const quizDetails = {
      quizId: quizId || "",
      score,
      quizName: name,
    };
    (async () => {
      await setUserScore({ quizDetails, scoreboard, authDispatch, userId });
    })();
  }, []);

  return (
    <div>
      {isQuizSelected ? (
        <>
          <h1 className="center-text my-2">Quiz Result</h1>
          <p className="lg-text center-text"> {result.message} </p>
          <p className="lg-text text-bold-weight center-text m-0-5">
            Score: {result.score} / 50
          </p>
          <h2 className="center-text my-3-5">Check Answers</h2>
          {questions.map(({ image, question, options, answerIndex }, idx) => {
            return (
              <div className="my-2" key={idx}>
                <div className="flex-row mx-auto justify-spc-bet mw-48r">
                  <span className="md-text mb-0-5">Question: {idx + 1}/5</span>
                  <span className="md-text mb-0-5 red-text">
                    {userSelectedAnswers[idx] === -1 && "No option selected"}
                  </span>
                </div>
                <div className="grid-2-col gap-2 container mx-auto  mw-48r">
                  <div className="flex-col justify-center">
                    <img
                      src={image}
                      alt="question1-img"
                      className="responsive-img"
                    />
                  </div>
                  <div className="flex-col">
                    <p>{question}</p>
                    <div className="flex-col justify-center">
                      {options.map((option, index) => {
                        return (
                          <div key={index} className="w-100p">
                            <input
                              className="option-input"
                              type="radio"
                              name="option"
                              id={`option${index}`}
                            />
                            <label
                              className={getClass(
                                index,
                                answerIndex,
                                userSelectedAnswers[idx]
                              )}
                              htmlFor={`option${index}`}
                            >
                              {option}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

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
