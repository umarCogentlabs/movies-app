import { useEffect } from "react";
import MovieRow from "./movie-row/MovieRow";
import "./styles/style.scss";
import SearchDropdown from "./movie-row/searchMovies/SearchDropdown";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesWithGenere } from "../../redux/movieWithGenere";

export default function Home() {
  const username = localStorage.getItem("username") || "";
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { moviesWithGenres } = useSelector(
    (state: any) => state.movieWithGenere
  );

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("../");
  };

  useEffect(() => {
    dispatch(fetchMoviesWithGenere());
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
