import React from "react";
import _ from "lodash";

function TableBody(props) {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  const { data, columns } = props;
  return (
    <tbody>
      {data.length > 0 ? (
        data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="text-center">
            No Match
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default TableBody;
