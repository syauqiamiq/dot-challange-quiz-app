import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CardLoginComponent from "../components/login/CardLoginComponent";
import { LoginContext } from "../context/LoginContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(LoginContext);
  useEffect(() => {
    if (sessionStorage.getItem("dummy_token") !== null) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  if (auth) {
    navigate("/quiz");
  }
  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-center" xs={12} sm={12} md={12} lg={12} xl={12}>
          <CardLoginComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
