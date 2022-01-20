import React from "react";
import Movie from "./movie/Movie";

interface Props {
  genere_data: Object;
}

export default function MovieRow({ genere_data }: Props) {
  return (
    <div className='movie-row-container'>
      <div className='generation'>{/* <p>{genere_data}</p> */}</div>

      <div className='movie-row'>
        {/* here will be map */}
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
      </div>
    </div>
  );
}
