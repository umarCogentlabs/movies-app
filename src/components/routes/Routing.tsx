import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import MovieDetails from "../home/movie-row/movie/movieDetails/MovieDetails";
import Login from "../loginSignup/Login";
import Register from "../loginSignup/Register";

function Routing() {
  return (
    <div className="RoutesComponent">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details/:movieId" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
