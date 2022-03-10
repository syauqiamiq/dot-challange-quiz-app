import React, { useContext } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

const CardLoginComponent = () => {
  const { values, handleChange, handleSubmit, auth, error } = useContext(LoginContext);
  const navigate = useNavigate();
  if (auth) {
    navigate("/quiz");
  }
  return (
    <Card className="quiz-card">
      <Card.Body>
        <h3 className="card-title">Yuk Login Dulu ...</h3>
        {error ? <Alert variant={"danger"}>Username atau Password Salah</Alert> : null}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">Username</Form.Label>
            <Form.Control type="text" name="username" value={values.username} onChange={handleChange} placeholder="Masukkan username kamu.." />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control type="password" name="password" value={values.password} onChange={handleChange} placeholder="Masukkan password kamu.." />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleSubmit} className="actionButton">
            Login
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardLoginComponent;
