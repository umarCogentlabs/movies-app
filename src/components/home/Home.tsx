import React, { useEffect } from "react";
import MovieRow from "./movie-row/MovieRow";
import axios from "axios";
import "./styles/style.scss";
import SearchDropdown from "./movie-row/search_movies/SearchDropdown";
import APIClient from "../common/API/index";
import { SET_GENERES_WITH_MOVIES } from "../common/redux-constants";
import { useNavigate } from "react-router";
import { useDispatch, connect } from "react-redux";

interface reduxProps {
  genereWithMoviesList: any[];
}

function Home({ genereWithMoviesList }: reduxProps) {
  const username = localStorage.getItem("username") || "";
  let navigate = useNavigate();
  const apiClient = new APIClient();
  const dispatch = useDispatch();

  function setMoviesWithGeneres(payload: object[]) {
    return { type: SET_GENERES_WITH_MOVIES, payload };
  }

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

    dispatch(setMoviesWithGeneres(filteredMovies));
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

        {genereWithMoviesList.map(
          (genereMovies) =>
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

const mapStateToProps = (state: any) => {
  return {
    genereWithMoviesList: state.setMoviesWithGenres,
  };
};

export default connect(mapStateToProps)(Home);
