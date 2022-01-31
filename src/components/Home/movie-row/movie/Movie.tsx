import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import APIClient from "../../../API_Data_Fetch/index";

interface Props {
  movie: { id: number; title: string; backdrop_path: string };
}
export default function Movie({ movie }: Props) {
  let navigate = useNavigate();
  const handleMovieDetailClick = () => {
    navigate(`../details/${movie.id}`);
  };

  const [isLiked, setIsLike] = useState(false);
  const handleLike = () => {
    setIsLike(!isLiked);
  };

  const apiClient = new APIClient();
  const imgUrl: string = apiClient.fetchMovieImage(movie.backdrop_path) || "";

  return (
    <div className="movie" onClick={handleMovieDetailClick}>
      <img src={imgUrl} alt="sample movie" />
      <div className="movie-details">
        <p className="movie-name">{movie.title}</p>
        <p className="movie-release-date">November 3 2020</p>
      </div>
      <div
        className="like"
        onClick={(e) => {
          e.stopPropagation();
          handleLike();
        }}>
        <p>{isLiked ? <p>Liked</p> : <p>Like</p>}</p>
      </div>
    </div>
  );
}
