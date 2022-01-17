import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    {
      path: "genre.name",
      label: "Genre",
    },
    {
      path: "numberInStock",
      label: "Stock",
    },
    {
      path: "dailyRentalRate",
      label: "Rate",
    },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLiked={() => this.props.onMovieLiked(movie)}
        />
      ),
    },
    {
      key: "action",
      content: (movie) => (
        <a
          onClick={() => this.props.onMovieDelete(movie)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </a>
      ),
    },
  ];

  render() {
    const { movies, sortColumn, onMovieSort } = this.props;
    return (
      <React.Fragment>
        <Table
          columns={this.columns}
          movies={movies}
          sortColumn={sortColumn}
          onMovieSort={onMovieSort}
        />
      </React.Fragment>
    );
  }
}

export default MoviesTable;
