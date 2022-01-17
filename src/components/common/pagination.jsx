import React from "react";
import propTypes from "prop-types";
import _ from "lodash";

function Pagination(props) {
  const { itemCounts, pageSize, currentPage, onPageChanged } = props;

  const pageRange = Math.ceil(itemCounts / pageSize);

  const pages = _.range(1, pageRange + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.length === 1
          ? null
          : pages.map((page) => (
              <li
                key={page}
                style={{ cursor: "pointer" }}
                className={
                  currentPage === page ? "page-item active" : "page-item"
                }
              >
                <a className="page-link" onClick={() => onPageChanged(page)}>
                  {page}
                </a>
              </li>
            ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itemCounts: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChanged: propTypes.func.isRequired,
};

export default Pagination;
