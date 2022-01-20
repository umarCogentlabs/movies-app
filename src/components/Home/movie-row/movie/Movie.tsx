import React from "react";

const handleLike = () => {
  alert("liked");
};

const handleMovieClick = () => {
  //redirect to movie detail page
};

export default function Movie() {
  const sample_img_url =
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b6qUu00iIIkXX13szFy7d0CyNcg.jpg";

  return (
    <div className='movie' onClick={handleMovieClick}>
      <img src={sample_img_url} alt='sample movie' />
      <div className='movie-details'>
        <p className='movie-name'>Avengers</p>
        <p className='movie-release-date'>November 3 2020</p>
      </div>
      <div className='like'>
        <a href='' onClick={handleLike}>
          Like
        </a>
      </div>
    </div>
  );
}
