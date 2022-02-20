import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import APIServices from "../api/api";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  useEffect(() => {
    getQuestions();
  }, []);
  const [questions, setQuestions] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sport",
    difficulty: "easy",
  });
  const getQuestions = async (api) => {
    try {
      setLoading(true);
      setWaiting(false);
      const response = await axios.get(api).catch((err) => console.log(err));
      if (response) {
        const data = response.data.results;
        if (data.length !== 0) {
          setQuestions(data);
          setLoading(false);
          setWaiting(false);
          setError(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      } else {
        setWaiting(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const nextQuestions = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect(correct + 1);
    }
    nextQuestions();
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${APIServices.apiURL}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    getQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        questions,
        setQuestions,
        waiting,
        setWaiting,
        loading,
        setLoading,
        index,
        setIndex,
        error,
        setError,
        correct,
        setCorrect,
        isModalOpen,
        setIsModalOpen,
        quiz,
        setQuiz,
        nextQuestions,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
