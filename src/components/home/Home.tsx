import React, { useEffect } from "react";
import MovieRow from "./movie-row/MovieRow";
import axios from "axios";
import "./styles/style.scss";
import SearchDropdown from "./movie-row/search_movies/SearchDropdown";
import APIClient from "../common/API/index";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setMoviesWithGenres } from "../../redux-toolkit/movieWithGenereSlice";

export default function Home() {
  const username = localStorage.getItem("username") || "";
  let navigate = useNavigate();
  const apiClient = new APIClient();
  const dispatch = useDispatch();

  const { moviesWithGenres } = useSelector(
    (state: any) => state.movieWithGenereSlice
  );

  const filterMovies = (genres: any[], movies: any[]) => {
    const filteredMovies = genres.map((genre) => {
      const newMovies = movies.filter((movie) =>
        movie.genre_ids.includes(genre.id)
      );

      return {
        ...genre,
        movies: newMovies,
      };
    });

    dispatch(setMoviesWithGenres(filteredMovies));
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("../");
  };

  useEffect(() => {
    axios.all([apiClient.fetchGeneres(), apiClient.fetchMovies()]).then(
      axios.spread((...res) => {
        const generes = res[0].data.genres;
        const movies = res[1].data.results;
        filterMovies(generes, movies);
      })
    );
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="heading">Movies List</h1>
        <div className="user-info">
          <img src="/assets/user_image.png" alt="" />
          <p>{username} </p>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <SearchDropdown />

        {moviesWithGenres?.map(
          (genereMovies: any) =>
            genereMovies.movies.length !== 0 && (
              <MovieRow
                key={genereMovies.id}
                genereData={genereMovies}
                username={username}
              />
            )
        )}
      </div>
    </>
  );
}
