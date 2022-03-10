import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useGlobalContext } from "../../context/AppContext";

const ModalComponent = () => {
  const { submitModal, isModalOpen, correct, questions } = useGlobalContext();

  return (
    <>
      <Modal show={isModalOpen}>
        <Modal.Header>
          <Modal.Title>Quiz Telah Selesai</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Jumlah Jawaban Benar: {correct}</p>
          <p>Jumlah Soal: {questions.length}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
