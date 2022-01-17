import React from "react";
import { useParams } from "react-router-dom";

function SingleMovie() {
  const params = useParams();
  return <div>You click on movie with id:{params.id}</div>;
}

export default SingleMovie;
