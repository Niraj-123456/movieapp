import React from "react";

function SearchBox({ value, onChange }) {
  return (
    <div className="my-3">
      <input
        type="text"
        value={value}
        className="form-control"
        id="formGroupExampleInput"
        placeholder="Search..."
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}

export default SearchBox;
