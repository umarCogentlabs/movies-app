import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import APIClient from "../../../common/API/index";
import { useDispatch, connect } from "react-redux";

interface Props {
  movie: { id: number; title: string; backdrop_path: string };
  likes: any[];
}

function setLike(payload: object[]) {
  return { type: "SET_LIKE", payload };
}

function Movie({ movie, likes }: Props) {
  let navigate = useNavigate();
  const [isLiked, setIsLike] = useState(false);
  const dispatch = useDispatch();

  let liked = false;
  likes.forEach((like) => {
    if (like.id === movie.id) {
      liked = like.islike;
    }
  });

  const handleMovieDetailClick = () => {
    navigate(`../details/${movie.id}`);
  };

  const handleLike = () => {
    debugger;
    setIsLike(!isLiked);
    const isLikedPayload = {
      id: movie.id,
      isLiked: !isLiked,
    };

    //@ts-ignore
    dispatch(setLike(isLikedPayload));
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
        <p>{liked ? <p>Liked</p> : <p>Like</p>}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    likes: state.setLikes,
  };
};

export default connect(mapStateToProps)(Movie);
