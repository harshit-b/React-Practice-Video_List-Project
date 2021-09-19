import React, { Component } from "react";

class Like extends React.Component {
  render() {
    let like = "fa fa-heart";
    if (!this.props.liked) like += "-o";
    return <i onClick={this.props.onClick} class={like} aria-hidden="true"></i>;
  }
}

export default Like;
