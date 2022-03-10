import parse from "html-react-parser";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useGlobalContext } from "../../context/AppContext";
import ModalComponent from "./ModalComponent";
const CardQuestionComponent = () => {
  const { timerSecond, timerDays, timerMinutes, timerHours, checkAnswer, index, getAnswer, questions, answer, correct } = useGlobalContext();
  useEffect(() => {
    getAnswer();
  }, [index]);

  if (localStorage.getItem("isStarted") === null) {
    window.location.reload();
  }
  const { question } = questions[index];

  return (
    <Card className="question-card">
      <Card.Body>
        <h3 className="quiz-info-content">
          Timer: {timerDays} Days {timerHours} Hours {timerMinutes} Minutes {timerSecond} Second
        </h3>
        <h3 className="quiz-info-content">Correct: {correct} </h3>
        <h3 className="quiz-info-content">
          Nomor Soal: {parseInt(index) + 1} dari {questions.length}{" "}
        </h3>
        <h3 className="quiz-info-content">Pertanyaan:</h3>
        <h3 className="question mb-5">{parse(question)}</h3>
        <h3 className="quiz-info-content">Answer:</h3>
        {answer.map((value, i) => {
          return (
            <div key={i}>
              <label type="button" value={value} onClick={() => checkAnswer(value)} className=" btn btn-primary d-block  w-100 mt-2 button-text actionButton">
                {parse(value)}
              </label>
              <ModalComponent />
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default CardQuestionComponent;
