import axios from "axios";
import { createContext, useContext, useState } from "react";
import APIServices from "../api/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState([]);
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
        setIsModalOpen(true);
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
      setAnswer(answer);
    } else {
      answer.push(answer[tempIndex]);
      answer[tempIndex] = correct_answer;
      localStorage.setItem("answer", JSON.stringify(answer));
      setAnswer(answer);
    }
  };
  const getQuestions = async (api) => {
    try {
      setLoading(true);
      setIsFinished(false);
      setWaiting(false);
      const response = await axios.get(api).catch((err) => console.log(err));
      if (response) {
        const data = response.data.results;
        if (data.length !== 0) {
          const endQuiz = new Date();
          // endQuiz.setSeconds(endQuiz.getSeconds() + 30); // DEMO TIMER
          endQuiz.setMinutes(endQuiz.getMinutes() + 5);
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

  const submitModal = () => {
    setIsFinished(true);
    localStorage.clear();
    setIsModalOpen(false);
  };

  const nextQuestions = async () => {
    setIndex((oldIndex) => {
      const index = parseInt(oldIndex) + 1;
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
    if (value === questions[index].correct_answer) {
      localStorage.setItem("correct", parseInt(correct) + 1);
      setCorrect(correct + 1);
    }
    nextQuestions();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = APIServices.apiURL;
    getQuestions(url);
  };

  const verifySession = () => {
    const isStarted = localStorage.getItem("isStarted");

    if (isStarted === null) {
      setAnswer([]);
      setQuestions([]);
      setCorrect(0);
      setIndex(0);
      setTimerDays(0);
      setTimerHours(0);
      setTimerMinutes(0);
      setTimerSecond(0);
      setWaiting(true);
      setIsFinished(false);
      return;
    }
    setWaiting(false);
    const answer = JSON.parse(localStorage.getItem("answer"));
    const questions = JSON.parse(localStorage.getItem("question"));
    const correct = localStorage.getItem("correct");
    const index = localStorage.getItem("current_index");
    setAnswer(answer);
    setQuestions(questions);
    setCorrect(parseInt(correct));
    setIndex(parseInt(index));

    startTimer();
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    window.location.reload();
  };
  return (
    <AppContext.Provider
      value={{
        handleRedirect,
        answer,
        setAnswer,
        data,
        setData,
        verifySession,
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
