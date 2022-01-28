import React, { useState } from "react";
import Movie from "./movie/Movie";

interface Props {
  genere_data: { id: number; name: string; movies: any[] };
  username: string;
}

export default function MovieRow({ genere_data }: Props) {
  return (
    <div className="movie-row-container">
      <div className="generation">
        <p>{genere_data.movies.length !== 0 && genere_data.name}</p>
      </div>

      <div className="movie-row">
        {genere_data.movies.length !== 0 &&
          genere_data.movies.map((movie, i) => {
            return <Movie key={i} movie={movie} />;
          })}
      </div>
    </div>
  );
}
