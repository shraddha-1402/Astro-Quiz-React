import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActionType, LocalRoutes, dataStateValue } from "../../constants";
import { useData } from "../../contexts";
import { useDynamicTitle } from "../../hooks";
import "./style.css";

const QuestionsPage = () => {
  useDynamicTitle();
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [timer, setTimer] = useState(30);
  const {
    dataState: { currentQuestion, currentQuiz, userSelectedAnswers },
    dataDispatch,
  } = useData();
  const { name, questions } = currentQuiz;
  const { question, options, image } = questions[currentQuestion];

  useEffect(() => {
    const timerId = setInterval(() => setTimer((timer) => timer - 1), 1000);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      dataDispatch({
        type: ActionType.SET_USER_SELECTED_ANSWERS,
        payload: {
          userSelectedAnswers: [...userSelectedAnswers, selectedAnswer],
        },
      });
      if (currentQuestion === questions.length - 1)
        navigate(`${LocalRoutes.RESULT_PAGE}/${quizId}`, { replace: true });
      else {
        dataDispatch({
          type: ActionType.SET_CURRENT_QUESTION,
          payload: { currentQuestion: currentQuestion + 1 },
        });
        setSelectedAnswer(-1);
        setTimer(30);
      }
    }
  }, [timer]);

  const handleQuitQuiz = () => {
    dataDispatch({
      type: ActionType.RESET_DATASTATE,
      payload: {
        state: dataStateValue,
      },
    });
    navigate(LocalRoutes.HOME, { replace: true });
  };

  const handleNext = () => {
    dataDispatch({
      type: ActionType.SET_USER_SELECTED_ANSWERS,
      payload: {
        userSelectedAnswers: [...userSelectedAnswers, selectedAnswer],
      },
    });
    dataDispatch({
      type: ActionType.SET_CURRENT_QUESTION,
      payload: { currentQuestion: currentQuestion + 1 },
    });
    setSelectedAnswer(-1);
    setTimer(30);

    if (currentQuestion === questions.length - 1)
      navigate(`${LocalRoutes.RESULT_PAGE}/${quizId}`, { replace: true });
  };

  return (
    <div>
      <h1 className="center-text my-2">{name}</h1>
      <div className="flex-row mx-auto justify-spc-bet mw-48r">
        <span className="md-text m-0-5">Question: {currentQuestion + 1}/5</span>
        <span className="md-text m-0-5"> {timer} secs </span>
      </div>
      <div className="grid-2-col gap-2 container mx-auto my-2 mw-48r">
        <div className="flex-row align-center">
          <img src={image} alt="question1-img" className="responsive-img" />
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
                    checked={index === selectedAnswer}
                    onChange={() => setSelectedAnswer(index)}
                  />
                  <label className="option-label" htmlFor={`option${index}`}>
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-row justify-spc-bet m-1 mw-48r mx-auto">
        <button
          className="btn btn-solid-danger"
          id="open-modal"
          onClick={handleQuitQuiz}
        >
          Quit Quiz
        </button>

        <button className="btn btn-solid-primary" onClick={handleNext}>
          {currentQuestion === questions.length - 1
            ? "Submit"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export { QuestionsPage };
