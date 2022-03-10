import React from "react";
import { Button, Card, Form } from "react-bootstrap";

const CardLoginComponent = () => {
  return (
    <Card className="quiz-card">
      <Card.Body>
        <h3 className="card-title">Yuk Login Dulu ...</h3>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="form-label">Username</Form.Label>
            <Form.Control type="text" placeholder="Masukkan username kamu.." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control type="password" placeholder="Masukkan password kamu.." />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-end">
          <Button variant="primary" className="actionButton">
            Login
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardLoginComponent;
