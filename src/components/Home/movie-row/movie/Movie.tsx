import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Props {
  movie: { id: number; title: string; backdrop_path: string };
}
export default function Movie({ movie }: Props) {
  let navigate = useNavigate();
  const handleMovieDetailClick = () => {
    navigate(`../details/${movie.id}`);
  };

  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  const sample_img_url: string = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path}`;

  return (
    <div className='movie' onClick={handleMovieDetailClick}>
      <img src={sample_img_url} alt='sample movie' />
      <div className='movie-details'>
        <p className='movie-name'>{movie.title}</p>
        <p className='movie-release-date'>November 3 2020</p>
      </div>
      <div
        className='like'
        onClick={(e) => {
          e.stopPropagation();
          handleLike();
        }}>
        <p>{like ? <p>Liked</p> : <p>Like</p>}</p>
      </div>
    </div>
  );
}
