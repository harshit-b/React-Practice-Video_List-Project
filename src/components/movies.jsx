import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import ListGroup from "./listGroup";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    currentGenre: "all",
    pageSize: 4,
    genres: getGenres(),
    sortColumn: { path: "title", order: "asc" },
  };

  handleGenreSelect = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const filtered =
      this.state.currentGenre === "all"
        ? this.state.movies
        : this.state.movies.filter(
            (movie) => movie.genre.name === this.state.currentGenre
          );

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const result = this.getPagedData();
    const { totalCount, data: movies } = result;

    if (totalCount === 0) return <p> There are no movies in the database </p>;
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            selectedGenre={this.state.currentGenre.name}
            genres={this.state.genres}
            onGenreSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <link
            rel="stylesheet"
            href="path/to/font-awesome/css/font-awesome.min.css"
          ></link>
          <p> Showing {movies.length} movies </p>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLiked={this.handleLike}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
