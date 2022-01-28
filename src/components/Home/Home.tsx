import React, { useEffect, useState } from "react";
import MovieRow from "./movie-row/MovieRow";
import axios from "axios";
import "./styles/style.scss";
import Search from "./movie-row/search_movies/Search";
import APIClient from "../API_Data Fetch/index";
import { useNavigate } from "react-router";

export default function Home() {
  const [genresWithMovies, setGenresWithMovies] = useState<any[]>([]);
  const username = localStorage.getItem("username") || "";

  const filterMovies = (genres: any[], movies: any[]) => {
    console.log(process.env);
    const newArr = genres.map((genre) => {
      const newMovies = movies.filter((movie) =>
        movie.genre_ids.includes(genre.id)
      );

      return {
        ...genre,
        movies: newMovies,
      };
    });

    setGenresWithMovies(newArr);
  };

  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("../");
  };

  useEffect(() => {
    const apiClient = new APIClient();
    axios.all([apiClient.fecthGeneres(), apiClient.fecthMovies()]).then(
      axios.spread((...res) => {
        console.log(res);
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
          <img
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
            alt=""
          />
          <p>{username} </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <Search />
        {genresWithMovies.map(
          (genere_movies) =>
            genere_movies.movies.length !== 0 && (
              <MovieRow
                key={genere_movies.id}
                genere_data={genere_movies}
                username={username}
              />
            )
        )}
      </div>
    </>
  );
}
