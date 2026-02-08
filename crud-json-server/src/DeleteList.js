import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteList(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="danger"
        onClick={(event) => {
          handleShow();
          // optional: preload data like Update does
          if (props.getList) props.getList(event, props.elementId);
        }}
      >
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete List</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            type="text"
            name="title"
            value={props.singledata.title}
            disabled
            className="d-block my-3 form-control"
          />

          <input
            type="text"
            name="author"
            value={props.singledata.author}
            disabled
            className="d-block my-3 form-control"
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button
            variant="danger"
            onClick={(event) => {
              handleClose();
              props.deleteList(event, props.elementId);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteList;
