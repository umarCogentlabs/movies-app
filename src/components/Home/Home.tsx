import React, { useEffect, useState } from "react";
import MovieRow from "./movie-row/MovieRow";
import axios from "axios";
// import "./styles/style.scss";
import "./styles/style.scss";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [generes, setGenere] = useState<any[]>([]);

  useEffect(() => {
    console.log("useeffect1");

    //fetching data
    const genereURL =
      "https://api.themoviedb.org/3//genre/movie/list?api_key=4ce6fff0da52d2214a794776a6bba549";

    const moviesURL =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=4ce6fff0da52d2214a794776a6bba549";
    axios
      .get(moviesURL)
      .then((res) => {
        setMovies(res.data.results);
      })
      .then(() => {
        axios.get(genereURL).then((res) => {
          setGenere(res.data.genres);
        });
      });
  }, []);

  useEffect(() => {
    console.log("useeffect2");

    //initializing movies array inside generes
    generes.forEach((genere) => {
      genere.movies = [];
    });

    //mapping movies to genere.movies array
    movies.forEach((movie) => {
      movie.genre_ids.forEach((genereID: any) => {
        generes.forEach((genere) => {
          genereID === genere.id && genere.movies.push(movie);
        });
      });
    });
  });

  useEffect(() => {
    console.log("useeffect3");

    console.log("movies", movies);
    console.log("genere", generes);
  });
  return (
    <>
      <div className='container'>
        <h1 className='heading'>Movies List</h1>
        <div className='search-bar'>
          <h3>Search Movies:</h3>
          <input type='text' />
        </div>
        {generes.map((genere, i) => {
          return <MovieRow key={i} genere_data={genere} />;
        })}
        <button>123</button>
      </div>
    </>
  );
}
