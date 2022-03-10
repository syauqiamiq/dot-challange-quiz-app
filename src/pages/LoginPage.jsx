import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardLoginComponent from "../components/login/CardLoginComponent";
import { LoginProvider } from "../context/LoginContext";

const LoginPage = () => {
  return (
    <LoginProvider>
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-center" xs={12} sm={12} md={12} lg={12} xl={12}>
            <CardLoginComponent />
          </Col>
        </Row>
      </Container>
    </LoginProvider>
  );
};

export default LoginPage;
