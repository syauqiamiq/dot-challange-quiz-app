import React from "react";
import { Button, Card } from "react-bootstrap";
import { useGlobalContext } from "../../context/AppContext";

const CardNavigationComponent = () => {
  const { questions, index } = useGlobalContext();
  console.log(questions);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Text>NAVIGASI SOAL</Card.Text>
        {questions.map((_, i) => {
          if (index === i) {
            return (
              <Button key={i} variant="success" className="m-2">
                {i + 1}
              </Button>
            );
          } else {
            return (
              <Button key={i} variant="primary" className="m-2">
                {i + 1}
              </Button>
            );
          }
        })}
      </Card.Body>
    </Card>
  );
};

export default CardNavigationComponent;
