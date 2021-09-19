import React, { Component } from "react";

class ListGroup extends React.Component {
  render() {
    return (
      <ul class="list-group">
        <li
          class={
            this.props.selectedGenre === "all"
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => this.props.onGenreSelect("all")}
        >
          All Genres
        </li>
        {this.props.genres.map((genre) => (
          <li
            key={genre._id}
            class={
              genre.name === this.props.selectedGenre
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => this.props.onGenreSelect(genre.name)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
