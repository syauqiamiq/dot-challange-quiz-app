import React from "react";
import { useGlobalContext } from "../../context/AppContext";

const CardQuestionComponent = () => {
  const { waiting, questions, loading, index, correct, nextQuestions, checkAnswer } = useGlobalContext();
  return <div>CardQuestionComponent</div>;
};

export default CardQuestionComponent;
