import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends React.Component {
  render() {
    console.log(this.props.currentPage);
    const pagesCount = Math.ceil(this.props.itemsCount / this.props.pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            {pages.map((page) => (
              <li
                key={page}
                class={
                  page === this.props.currentPage
                    ? "page-item active"
                    : "page-item"
                }
              >
                <a
                  class="page-link"
                  onClick={() => this.props.onPageChange(page)}
                >
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

Pagination.propTypes = {
  itemscount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
