import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useGlobalContext } from "../../context/AppContext";

const ModalComponent = () => {
  const { submitModal, closeModal, isModalOpen } = useGlobalContext();

  return (
    <>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Jumlah Benar 10</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={submitModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
