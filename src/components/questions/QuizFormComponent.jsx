import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/AppContext";

const QuizFormComponent = () => {
  const { getQuestions, quiz, handleChange, handleSubmit, error } = useGlobalContext();

  return (
    <div>
      <form>
        <h2>Lets Start The Quiz</h2>
        <div className="mb-4">
          <label htmlFor="numberOfQuestions">Number Of Questions</label>
          <input type="number" name="amount" id="numberOfQuestions" className="form-control" value={quiz.amount} onChange={handleChange} min={1} max={50} />
        </div>
        <div className="mb-4">
          <label htmlFor="category">Category</label>
          <select name="category" id="category" value={quiz.category} onChange={handleChange} className="form-select">
            <option value="sports">Sports</option>
            <option value="history">History</option>
            <option value="politics">Politics</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="difficulty">Difficulty</label>
          <select name="difficulty" id="difficulty" value={quiz.difficulty} onChange={handleChange} className="form-select">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="politics">Hard</option>
          </select>
        </div>

        {error && <p>Cant Generate questions, please try other options</p>}
        <button onClick={handleSubmit} type="submit" className="btn btn-success">
          MULAI QUIZ
        </button>
      </form>
    </div>
  );
};

export default QuizFormComponent;
