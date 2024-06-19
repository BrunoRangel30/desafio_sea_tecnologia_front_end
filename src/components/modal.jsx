import React, { useState,useEffect } from "react";
import { Modal,Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const ModalComponente = () => {
    const [showModal, setShowModal] = useState(false);
    const { loading, mensagem } = useSelector((state) => state.funcionario);
    useEffect(() => {
        if (loading) {
            setShowModal(true);
        }
    }, [loading]);
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} className="config-modal">
    <Modal.Header closeButton className="config-modal-2">
    </Modal.Header>
    <Modal.Body className="config-modal-2">{mensagem}</Modal.Body>
    <Modal.Footer className="config-modal-2">
      <Button variant="secondary" onClick={() => setShowModal(false)}>ok</Button>
    </Modal.Footer>
  </Modal>
  );
};

export default ModalComponente;
