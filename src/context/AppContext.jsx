import axios from "axios";
import { createContext, useContext, useState } from "react";
import APIServices from "../api/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
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
    const endQuiz = new Date(localStorage.getItem("expired"));
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
        // localStorage.setItem("timer", `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Second`);
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSecond(seconds);
      }
    }, [1000]);
  };
  const getAnswer = () => {
    const questions = JSON.parse(localStorage.getItem("question"));
    setQuestions(JSON.parse(localStorage.getItem("question")));
    const { incorrect_answers, correct_answer } = questions[index];
    let answer = [...incorrect_answers];
    const tempIndex = Math.floor(Math.random() * 4);
    if (tempIndex === 3) {
      answer.push(correct_answer);
      localStorage.setItem("answer", JSON.stringify(answer));
    } else {
      answer.push(answer[tempIndex]);
      answer[tempIndex] = correct_answer;
      localStorage.setItem("answer", JSON.stringify(answer));
    }
  };
  const getQuestions = async (api) => {
    try {
      setLoading(true);
      setWaiting(false);
      const response = await axios.get(api).catch((err) => console.log(err));
      if (response) {
        const data = response.data.results;
        if (data.length !== 0) {
          const endQuiz = new Date();
          endQuiz.setHours(endQuiz.getHours() + 2);
          localStorage.setItem("current_index", 0);
          localStorage.setItem("isStarted", true);
          localStorage.setItem("expired", endQuiz);
          localStorage.setItem("correct", 0);
          localStorage.setItem("question", JSON.stringify(data));
          getAnswer();
          startTimer();
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
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const submitModal = () => {
    setIsFinished(true);
    setIsModalOpen(false);
  };

  const nextQuestions = async () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return oldIndex;
      } else {
        localStorage.setItem("current_index", index);
        return index;
      }
    });
  };

  const checkAnswer = (value) => {
    const questions = JSON.parse(localStorage.getItem("question"));
    console.log(questions[index].correct_answer);
    if (value === questions[index].correct_answer) {
      localStorage.setItem("correct", correct + 1);
      setCorrect(correct + 1);
    }
    nextQuestions();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = APIServices.apiURL;
    getQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        submitModal,
        isFinished,
        setIsFinished,
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
        checkAnswer,
        closeModal,
        handleSubmit,
        getAnswer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
