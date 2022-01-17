import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Customer from "./components/customer";
import Rental from "./components/rental";
import MoviesForm from "./components/moviesForm";
import Login from "./components/login";
import Register from "./components/register";
import NotFound from "./components/notFound";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <ToastContainer />
        <Switch>
          <Route path="/movies/:id" exact component={MoviesForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/movies/new" component={MoviesForm} />
          <Route path="/customer" component={Customer} />
          <Route path="/rental" component={Rental} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
