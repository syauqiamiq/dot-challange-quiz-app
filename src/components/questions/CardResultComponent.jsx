import React from "react";
import { Button, Card } from "react-bootstrap";
import { useGlobalContext } from "../../context/AppContext";

const CardResultComponent = () => {
  const { correct, questions, handleRedirect, isFinished } = useGlobalContext();

  return (
    <Card className="question-card">
      <Card.Body>
        <h3 className="quiz-info-content">Nilai Anda:</h3>
        <h3 className="result-text mb-5">{(correct / questions.length) * 100} Points</h3>
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleRedirect} className="actionButton">
            Back to Menu
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardResultComponent;
