import React from "react";
import CardQuestionComponent from "../components/questions/CardQuestionComponent.jsx";
import QuizFormComponent from "../components/questions/QuizFormComponent.jsx";
import { useGlobalContext } from "../context/AppContext";

const QuestionPage = () => {
  const { waiting } = useGlobalContext();
  if (waiting) {
    return <QuizFormComponent />;
  }
  return <CardQuestionComponent />;
};

export default QuestionPage;
