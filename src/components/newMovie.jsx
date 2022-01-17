import React from "react";
import { Link } from "react-router-dom";

function NewMovie() {
  return (
    <div className="my-2">
      <Link to="/movies/new" className="btn btn-primary">
        New +
      </Link>
    </div>
  );
}

export default NewMovie;
