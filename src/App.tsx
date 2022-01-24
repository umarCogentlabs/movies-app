import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./components/Home/movie-row/movie/movie_details/MovieDetail";

function App() {
  return (
    <div className='App'>
      {/* <Home /> */}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail' element={<MovieDetail />} />
          {/* <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
