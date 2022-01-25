import React, { useEffect, useState } from "react";
import MovieRow from "./movie-row/MovieRow";
import axios from "axios";
import "./styles/style.scss";
export default function Home() {
  const [genresWithMovies, setGenresWithMovies] = useState<any[]>([]);

  const filterMovies = (genres: any[], movies: any[]) => {
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

  useEffect(() => {
    async function fecthData() {
      //fetching data
      const genereURL =
        "https://api.themoviedb.org/3//genre/movie/list?api_key=4ce6fff0da52d2214a794776a6bba549";

      const moviesURL =
        "https://api.themoviedb.org/3/movie/top_rated?api_key=4ce6fff0da52d2214a794776a6bba549";

      try {
        const movieData = await axios.get(moviesURL);
        const genreData = await axios.get(genereURL);
        const results = movieData.data.results;
        const genres = genreData.data.genres;
        filterMovies(genres, results);
      } catch (error) {
        console.log(error);
      }
    }
    fecthData();
  }, []);

  return (
    <>
      <div className='container'>
        <h1 className='heading'>Movies List</h1>
        <div className='search-bar'>
          <h3>Search Movies:</h3>
          <input type='text' />
        </div>
        {genresWithMovies.map((genere_movies) => {
          return (
            genere_movies.movies.length !== 0 && (
              <MovieRow key={genere_movies.id} genere_data={genere_movies} />
            )
          );
        })}
      </div>
    </>
  );
}
