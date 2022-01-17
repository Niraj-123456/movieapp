import http from "./httpServices";
import { apiURL } from "../../config.json";

const apiEndPoint = apiURL + "/auth";

export async function login(email, password) {
  return http.post(apiEndPoint, {
    email,
    password,
  });
}
