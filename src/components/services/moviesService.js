import http from "./httpServices";
import { apiURL } from "../../config.json";

const apiEndPoint = apiURL + "/movies";

function fetchMovieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export async function getMovies() {
  return http.get(apiEndPoint);
}

export async function getMovie(movieId) {
  return http.get(fetchMovieUrl(movieId));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(fetchMovieUrl(movie._id), body);
  }

  return http.post(apiEndPoint, movie);
}

export async function deleteMovie(movieId) {
  return http.delete(fetchMovieUrl(movieId));
}
