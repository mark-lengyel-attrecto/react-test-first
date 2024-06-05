import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IMovie } from "../models/movie.interface";

interface AppEditModalProps {
  movie: IMovie;
  onSave?: (edited: IMovie) => void;
  className?: string;
}

const AppEditModal: React.FC<AppEditModalProps> = ({
  movie,
  onSave,
  className,
}) => {
  const [show, setShow] = useState(false);
  const [edited, setEdited] = useState(movie);

  const handleSave = () => {
    setShow(false);
    onSave && onSave(edited);
  };

  const handleClose = () => {
    setEdited(movie);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleEdit = ({
    target: { id, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEdited({
      ...edited,
      [id]: value,
    });
  };

  return (
    <>
      <Button className={className} variant="success" onClick={handleShow}>
        <Pencil />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit movie</Modal.Title>
        </Modal.Header>
        <Modal.Body className="container">
          <div className="row mb-2">
            <InputGroup className="col">
              <InputGroup.Text>Title</InputGroup.Text>
              <Form.Control
                value={edited.title}
                id="title"
                onChange={handleEdit}
              />
            </InputGroup>
          </div>

          <div className="row g-2">
            <InputGroup className="col">
              <InputGroup.Text>Year</InputGroup.Text>
              <Form.Control
                type="number"
                value={edited.year}
                id="year"
                onChange={handleEdit}
              />
            </InputGroup>

            <InputGroup className="col">
              <InputGroup.Text>Rating</InputGroup.Text>
              <Form.Control
                type="number"
                min={1}
                max={10}
                step={0.1}
                value={edited.rating}
                id="rating"
                onChange={handleEdit}
              />
            </InputGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={Object.values(edited).some((value) => !value)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppEditModal;
