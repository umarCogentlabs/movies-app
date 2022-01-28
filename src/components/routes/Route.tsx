import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import MovieDetail from "../Home/movie-row/movie/movie_details/MovieDetail";
import Login from "../Home/login/Login";

function RoutesComponent() {
  return (
    <div className="RoutesComponent">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/details/:movieId" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesComponent;
