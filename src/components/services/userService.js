import http from "./httpServices";
import { apiURL } from "../../config.json";

const apiEndPoint = apiURL + "/users";

export async function register(user) {
  return http.post(apiEndPoint, {
    name: user.username,
    email: user.email,
    password: user.password,
  });
}
