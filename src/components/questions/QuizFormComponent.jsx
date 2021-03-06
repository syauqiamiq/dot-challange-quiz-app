import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import APIServices from "../../api/api";
import { useGlobalContext } from "../../context/AppContext";
import { LoginContext } from "../../context/LoginContext";

const QuizFormComponent = () => {
  const { handleSubmit, error, data, setData } = useGlobalContext();
  const { handleLogout } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get(APIServices.apiURL)
      .then(function (response) {
        const res = response.data.results;
        setData(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <Card className="quiz-card">
      <Card.Body>
        <h3 className="card-title">Informasi Quiz</h3>
        {data.length !== 0 ? (
          <>
            <p className="quiz-info-content">{data[0].category}</p>
            <p className="quiz-info-content">Jumlah Soal: {data.length} Soal</p>
            <p className="quiz-info-content">Tingkat Kesulitan: {data[0].difficulty}</p>
          </>
        ) : (
          <Spinner animation="border" variant="light" />
        )}
        <div className="d-flex justify-content-between">
          <Button variant="primary" onClick={handleLogout} className="actionButton">
            Logout
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="actionButton">
            Mulai Quiz
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default QuizFormComponent;
