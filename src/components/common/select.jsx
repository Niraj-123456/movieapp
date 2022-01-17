import React from "react";

function Select({ name, label, options, error, ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        id={name}
        name={name}
        {...rest}
        className="form-select"
        aria-label="Default select example"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger my-1">{error}</div>}
    </div>
  );
}

export default Select;
