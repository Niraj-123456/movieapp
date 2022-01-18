import { useEffect } from "react";
import auth from "./services/auth";

function Logout() {
  useEffect(() => {
    auth.logout();
    window.location = "/";
  }, []);
  return null;
}

export default Logout;
