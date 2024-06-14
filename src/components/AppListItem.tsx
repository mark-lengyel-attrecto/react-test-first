import { FC } from "react";

import { Card } from "react-bootstrap";
import { StarFill, Trash } from "react-bootstrap-icons";

import { MovieModel } from "../models/movie.model";
import AppButton from "./AppButton";
import AppEditModal from "./AppEditModal";

import "./AppListItem.scss";

interface AppListItemProps {
  movie: MovieModel;
  onEdit: (edited: MovieModel) => void;
  onDelete: (deleted: MovieModel) => void;
  index?: number;
}

const AppListItem: FC<AppListItemProps> = ({
  movie,
  onEdit,
  onDelete,
  index,
}) => {
  const handleDelete = () => onDelete(movie);

  return (
    <Card className="d-flex flex-row justify-content-between">
      <Card.Img src={movie.thumbnail} />

      <Card.Body className="align-self-center d-block text-truncate">
        <Card.Title className="d-block text-truncate">
          {index && `${index}. `}
          {movie.title} ({movie.year})
        </Card.Title>
      </Card.Body>

      <Card.Footer>
        <div className="container d-flex flex-column h-100">
          <Card className="row mb-1">
            <Card.Body className="col d-flex justify-content-center align-items-center p-2">
              <StarFill className="me-2" color="orange" />
              {movie.rating}
            </Card.Body>
          </Card>

          <div className="row gap-1">
            <AppButton className="col" variant="danger" onClick={handleDelete}>
              <Trash />
            </AppButton>

            <AppEditModal className="col" movie={movie} onSave={onEdit} />
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default AppListItem;
