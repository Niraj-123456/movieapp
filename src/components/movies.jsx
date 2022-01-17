import React, { Component } from "react";
import { getMovies, deleteMovie } from "./services/moviesService";
import { getGenres } from "./services/genreService";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import FilterGenre from "./common/filterGenre";
import MoviesTable from "./moviesTable";
import NewMovie from "./newMovie";
import SearchBox from "./common/searchBar";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "acs" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: allGenres } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genre" }, ...allGenres];
    this.setState({ movies, genres });
  }

  handleMovieDelete = async (movie) => {
    const previousMovies = this.state.movies;
    const movies = previousMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
      toast.success("Movie deleted successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Movies has already been deleted");

      this.setState({ movies: previousMovies });
    }
  };

  handleMovieLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChanged = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelected = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleMovieSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((g) => g.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { genres, currentPage, pageSize, selectedGenre, sortColumn } =
      this.state;

    const { totalCount, data: movies } = this.getPagedData();

    if (count === 0) return <h2>There are no movies in the database</h2>;

    return (
      <div className="container">
        <div className="row" style={{ marginTop: "50px" }}>
          <div className="col-3" style={{ marginTop: "80px" }}>
            <FilterGenre
              genres={genres}
              genreSelected={selectedGenre}
              onGenreSelected={this.handleGenreSelected}
            />
          </div>
          <div className="col mx-4">
            <h2>There are {totalCount} movies in the database</h2>
            <NewMovie />

            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />

            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onMovieSort={this.handleMovieSort}
              onMovieLiked={this.handleMovieLiked}
              onMovieDelete={this.handleMovieDelete}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Pagination
              itemCounts={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChanged={this.handlePageChanged}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
