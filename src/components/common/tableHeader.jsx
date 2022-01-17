import React from "react";

function TableHeader(props) {
  const raiseSort = (path) => {
    const sortColumn = { ...props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    props.onMovieSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    const { sortColumn } = props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fas fa-sort-down"></i>;
    return <i className="fas fa-sort-up"></i>;
  };
  return (
    <thead>
      <tr>
        {props.columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
