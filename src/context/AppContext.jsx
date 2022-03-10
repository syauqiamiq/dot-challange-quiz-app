import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import APIServices from "../api/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sport",
    difficulty: "easy",
  });
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSecond, setTimerSecond] = useState();
  let interval;
  const startTimer = () => {
    const endQuiz = new Date();
    endQuiz.setHours(endQuiz.getHours() + 2);
    interval = setInterval(() => {
      let now = new Date().getTime();
      let difference = endQuiz - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      if (difference < 0) {
        //STOP TIMER
        clearInterval(interval.current);
      } else {
        //UPDATE
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSecond(seconds);
      }
    });
  };

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

  const previousQuestions = () => {
    setIndex((oldIndex) => {
      if (index === 0) {
        return 0;
      } else {
        const index = oldIndex - 1;
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
    const url = APIServices.apiURL;
    getQuestions(url);
    // startTimer();
  };

  return (
    <AppContext.Provider
      value={{
        timerDays,
        timerHours,
        timerMinutes,
        timerSecond,
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
        previousQuestions,
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
