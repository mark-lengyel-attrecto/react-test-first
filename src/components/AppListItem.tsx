import { Card } from "react-bootstrap";
import { StarFill, Trash } from "react-bootstrap-icons";
import { IMovie } from "../models/movie.interface";
import AppButton from "./AppButton";
import AppEditModal from "./AppEditModal";
import "./AppListItem.scss";

interface AppListItemProps {
  movie: IMovie;
  onEdit: (edited: IMovie) => void;
  onDelete: (deleted: IMovie) => void;
  index?: number;
}

const AppListItem: React.FC<AppListItemProps> = ({
  movie,
  onEdit,
  onDelete,
  index,
}) => {
  return (
    <Card className="d-flex flex-row justify-content-between">
      <Card.Img
        style={{ minWidth: "5rem", width: "5rem" }}
        src={movie.thumbnail}
      />

      <Card.Body className="align-self-center d-block text-truncate">
        <Card.Title className="d-block text-truncate">
          {index && `${index}. `}
          {movie.title} ({movie.year})
        </Card.Title>
      </Card.Body>

      <Card.Footer style={{ minWidth: "10rem" }}>
        <div className="container d-flex flex-column h-100">
          <Card className="row mb-1">
            <Card.Body className="col d-flex justify-content-center align-items-center p-2">
              <StarFill className="me-2" color="orange" />
              {movie.rating}
            </Card.Body>
          </Card>

          <div className="row gap-1">
            <AppButton
              className="col"
              variant="danger"
              onClick={() => onDelete(movie)}
            >
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
