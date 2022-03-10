import parse from "html-react-parser";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { useGlobalContext } from "../../context/AppContext";
const CardQuestionComponent = () => {
  const { nextQuestions, previousQuestions, index, questions } = useGlobalContext();

  const { question, incorrect_answers, correct_answer } = questions[index];
  let answer = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answer.push(correct_answer);
  } else {
    answer.push(answer[tempIndex]);
    answer[tempIndex] = correct_answer;
  }

  return (
    <Card className="question-card">
      <Card.Body>
        <h3 className="question mb-5">{parse(question)}</h3>
        <h3 className="quiz-info-content">Answer:</h3>
        {answer.map((value, index) => {
          return (
            <Button key={index} variant="primary" className="d-block  w-100 mt-2 button-text actionButton">
              {parse(value)}
            </Button>
          );
        })}
        {index === questions.length - 1 ? (
          <div className="d-flex justify-content-between ">
            <Button variant="warning" onClick={() => previousQuestions()} className="mt-5 button-text actionButton">
              PREVIOUS QUESTION
            </Button>
            <Button variant="success" className="mt-5 button-text ">
              SUBMIT
            </Button>
          </div>
        ) : (
          <div className="d-flex justify-content-between">
            {index === 0 ? (
              ""
            ) : (
              <Button variant="warning" onClick={() => previousQuestions()} className="button-text mt-5 actionButton">
                PREVIOUS QUESTION
              </Button>
            )}
            <Button variant="warning" onClick={() => nextQuestions()} className="button-text mt-5 actionButton">
              Next Question
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardQuestionComponent;
