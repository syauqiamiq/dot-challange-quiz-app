import React, { useContext, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CardQuestionComponent from "../components/questions/CardQuestionComponent.jsx";
import CardResultComponent from "../components/questions/CardResultComponent.jsx";
import QuizFormComponent from "../components/questions/QuizFormComponent.jsx";
import { useGlobalContext } from "../context/AppContext";
import { LoginContext } from "../context/LoginContext.jsx";

const QuestionPage = () => {
  const { loading, waiting, isFinished } = useGlobalContext();
  const { auth, setAuth } = useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("dummy_token") !== null) {
      setAuth(true);
    } else {
      setAuth(false);
      window.location.reload();
    }
  });
  if (sessionStorage.getItem("dummy_token") === null) {
    window.location.reload();
  }
  if (!auth) {
    navigate("/");
  }

  if (waiting) {
    return (
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-center" xs={12} sm={12} md={12} lg={12} xl={12}>
            <QuizFormComponent />
          </Col>
        </Row>
      </Container>
    );
  }
  if (loading) {
    return (
      <Container fluid>
        <div style={{ marginTop: 200 }}>
          <Row>
            <Col className="d-flex justify-content-center" xs={12} sm={12} md={12} lg={12} xl={12}>
              <Spinner animation="border" variant="light" style={{ width: 100, height: 100, borderWidth: 10 }} />
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
  if (isFinished) {
    return (
      <Container fluid>
        <div style={{ marginTop: 200 }}>
          <Row>
            <Col className="d-flex justify-content-center" xs={12} sm={12} md={12} lg={12} xl={12}>
              <CardResultComponent />
            </Col>
          </Row>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <Container fluid>
        <div className="mt-5">
          <Row>
            <Col className="d-flex justify-content-center" xs={12} sm={12} md={12} lg={12} xl={12}>
              <CardQuestionComponent />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default QuestionPage;
