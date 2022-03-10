import React from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import CardNavigationComponent from "../components/questions/CardNavigationComponent.jsx";
import CardQuestionComponent from "../components/questions/CardQuestionComponent.jsx";
import QuizFormComponent from "../components/questions/QuizFormComponent.jsx";
import { useGlobalContext } from "../context/AppContext";

const QuestionPage = () => {
  const { loading, waiting } = useGlobalContext();
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
  return (
    <div>
      <Container fluid>
        <div className="mt-5">
          <Row>
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <CardNavigationComponent />
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <CardQuestionComponent />
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              TIME COMPONENT
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default QuestionPage;
