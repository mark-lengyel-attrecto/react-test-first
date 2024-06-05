import React, { useState } from "react";
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
import { IMovie } from "../models/movie.interface";
import "./Movies.scss";

enum MovieOrder {
  ALPHABETICAL = "alphabetical",
  RATING = "rating",
  YEAR = "year",
}

function Movies() {
  const [movies, setMovies] = useState(MOVIES);
  const [search, setSearch] = useState("");
  const [descending, setDescending] = useState(true);
  const [order, setOrder] = useState(MovieOrder.RATING);

  const getListItems = (movies: IMovie[]) => {
    return movies.map((movie, index) => {
      return (
        <AppListItem
          key={movie.id}
          movie={movie}
          index={index + 1}
          onEdit={editMovie}
          onDelete={deleteMovie}
        />
      );
    });
  };

  const editMovie = (edited: IMovie) => {
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

  const deleteMovie = (deleted: IMovie) => {
    setMovies(movies.filter((movie) => movie.id !== deleted.id));
  };

  const filterMovies = (movies: IMovie[]) => {
    const filtered = movies
      .filter((movie) =>
        movie.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .sort((a, b) => {
        switch (order) {
          case MovieOrder.ALPHABETICAL:
            return a.title.localeCompare(b.title);
          case MovieOrder.RATING:
            return b.rating - a.rating;
          case MovieOrder.YEAR:
            return b.year - a.year;
        }
      });

    return descending ? filtered : filtered.reverse();
  };

  const handleSearchChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const handleSortChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(value as MovieOrder);
  };

  const getOrderIcon = (size: number = 20) => {
    let asc = <></>;
    let desc = <></>;

    switch (order) {
      case MovieOrder.ALPHABETICAL:
        asc = <SortAlphaDownAlt size={size} />;
        desc = <SortAlphaDown size={size} />;
        break;
      case MovieOrder.RATING:
      case MovieOrder.YEAR:
        asc = <SortNumericDown size={size} />;
        desc = <SortNumericDownAlt size={size} />;
        break;
    }

    return descending ? desc : asc;
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
              <Form.Select value={order} onChange={handleSortChange}>
                <option value={MovieOrder.ALPHABETICAL}>Alphabetical</option>
                <option value={MovieOrder.RATING}>Rating</option>
                <option value={MovieOrder.YEAR}>Year</option>
              </Form.Select>
            </InputGroup>
          </Col>
          <Col md="1" className="descending-button-wrapper">
            <AppButton
              className="w-100 mb-3"
              variant="primary"
              onClick={() => setDescending(!descending)}
            >
              {getOrderIcon()}
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
