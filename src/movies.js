import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {};

  renderTable = (movies) => {
    const table = movies.map((movie) => (
      <tr>
        <td>{movie.title}</td>
      </tr>
    ));

    return (
      <table>
        <tr>
          <th> Title </th>
          <th> Genre </th>
          <th> Stock </th>
          <th> Rate </th>
        </tr>
        {table}
      </table>
    );
  };
  renderMovies() {
    if (this.state.movies.length === 0) return <p> No Movies Available!</p>;

    return (
      <div>
        <p> There are {this.state.movies.length} movies </p>
        {() => this.renderTable(this.state.movies)}
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.renderMovies()}</React.Fragment>;
  }
}

export default Movies;
