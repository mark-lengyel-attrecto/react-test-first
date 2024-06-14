import { ChangeEvent, useState } from "react";

import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import {
  SortAlphaDown,
  SortAlphaDownAlt,
  SortNumericDown,
  SortNumericDownAlt,
} from "react-bootstrap-icons";

import AppButton from "../components/AppButton";
import AppListItem from "../components/AppListItem";
import { MOVIES } from "../data/movies";
import { MovieModel } from "../models/movie.model";

import "./Movies.scss";

enum MovieSortBy {
  ALPHABETICAL = "alphabetical",
  RATING = "rating",
  YEAR = "year",
}

function Movies() {
  const [movies, setMovies] = useState(MOVIES);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState(true);
  const [sortBy, setSortBy] = useState(MovieSortBy.RATING);

  const getListItems = (movies: MovieModel[]) =>
    movies.map((movie, index) => (
      <AppListItem
        key={movie.id}
        movie={movie}
        index={index + 1}
        onEdit={editMovie}
        onDelete={deleteMovie}
      />
    ));

  const editMovie = (edited: MovieModel) => {
    setMovies(
      movies.map((movie) => {
        if (movie.id === edited.id) {
          return edited;
        } else {
          return movie;
        }
      })
    );
  };

  const deleteMovie = (deleted: MovieModel) => {
    setMovies(movies.filter((movie) => movie.id !== deleted.id));
  };

  const filterMovies = (movies: MovieModel[]) => {
    const filtered = movies
      .filter((movie) =>
        movie.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .sort((a, b) => {
        const movieSortBy = {
          [MovieSortBy.ALPHABETICAL]: a.title.localeCompare(b.title),
          [MovieSortBy.RATING]: b.rating - a.rating,
          [MovieSortBy.YEAR]: b.year - a.year,
        };

        return movieSortBy[sortBy];
      });

    return order ? filtered : filtered.reverse();
  };

  const handleSearchChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const handleSortByChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(value as MovieSortBy);
  };

  const handleOrderChange = () => setOrder(!order);

  const getSortIcon = (size: number = 20) => {
    let asc = <SortNumericDown size={size} />;
    let desc = <SortNumericDownAlt size={size} />;

    if (sortBy === MovieSortBy.ALPHABETICAL) {
      asc = <SortAlphaDownAlt size={size} />;
      desc = <SortAlphaDown size={size} />;
    }

    return order ? desc : asc;
  };

  return (
    <>
      <Container fluid className="gx-0">
        <Row className="gx-3">
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text>Search</InputGroup.Text>
              <Form.Control
                placeholder="Name of the movie"
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Col>
          <Col lg="2" md="4">
            <InputGroup className="mb-3">
              <InputGroup.Text>Sort by</InputGroup.Text>
              <Form.Select value={sortBy} onChange={handleSortByChange}>
                <option value={MovieSortBy.ALPHABETICAL}>Alphabetical</option>
                <option value={MovieSortBy.RATING}>Rating</option>
                <option value={MovieSortBy.YEAR}>Year</option>
              </Form.Select>
            </InputGroup>
          </Col>
          <Col md="1" className="descending-button-wrapper">
            <AppButton
              className="w-100 mb-3"
              variant="primary"
              onClick={handleOrderChange}
            >
              {getSortIcon()}
            </AppButton>
          </Col>
        </Row>
      </Container>
      <div className="d-flex flex-column gap-2">
        {getListItems(filterMovies(movies))}
      </div>
    </>
  );
}

export default Movies;
