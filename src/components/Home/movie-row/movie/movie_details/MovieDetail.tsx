import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// interface movieDetails {
//   original_title: string;
// }

export default function MovieDetail() {
  const [movieDetails, setMovieDetails] = useState<any>();
  let { movieID } = useParams<{ movieID: string }>();
  let movieIDInt = parseInt(movieID || "");

  const saveMovieDetails = (movieDetailsGet: {}) => {
    debugger;
    setMovieDetails(movieDetailsGet);
  };

  useEffect(() => {
    async function fetchMovieDetails() {
      const movie_details_URL = `https://api.themoviedb.org/3/movie/${movieIDInt}?api_key=4ce6fff0da52d2214a794776a6bba549`;
      try {
        const movieDetailsGet = await axios.get(movie_details_URL);
        saveMovieDetails(movieDetailsGet.data);
      } catch (error) {
        console.log(error);
        debugger;
      }
    }
    fetchMovieDetails();
  }, []);

  return (
    <div>
      Detail page {movieIDInt}--{movieDetails?.title}
    </div>
  );
}
