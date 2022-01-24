import React, { useState } from "react";
import Movie from "./movie/Movie";

interface Props {
  genere_data: { id: number; name: string; list: any[] };
}

export default function MovieRow({ genere_data }: Props) {
  return (
    <div className='movie-row-container'>
      <div className='generation'>
        <p>{genere_data.list.length !== 0 && genere_data.name}</p>
      </div>

      <div className='movie-row'>
        {genere_data.list.length !== 0 &&
          genere_data.list.map((movie, i) => {
            return <Movie key={i} movie={movie} />;
          })}
      </div>
    </div>
  );
}
