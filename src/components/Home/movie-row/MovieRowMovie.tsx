import React, { useEffect, useState } from "react";

const handleMovieClick = () => {
  // alert();
};

interface Props {
  movie: { title: string; backdrop_path: string };
}

export default function MovieRowMovie({ movie }: Props) {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  const sample_img_url: string = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path}`;

  return (
    <div className="movie" onClick={handleMovieClick}>
      <img src={sample_img_url} alt="sample movie" />
      <div className="movie-details">
        <p className="movie-name">{movie.title}</p>
        <p className="movie-release-date">November 3 2020</p>
      </div>
      <div className="like">
        <p onClick={handleLike}>{!like ? <p>like</p> : <p>Liked</p>}</p>
      </div>
    </div>
  );
}
