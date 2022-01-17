import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

function Table({ columns, movies, sortColumn, onMovieSort }) {
  return (
    <React.Fragment>
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onMovieSort={onMovieSort}
        />
        <TableBody data={movies} columns={columns} />
      </table>
    </React.Fragment>
  );
}

export default Table;
