import { useNavigate } from "react-router";
import APIClient from "../../../common/API/index";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../../../redux-toolkit/likesSlice";
import { setLike } from "../../../../redux-toolkit/likesSlice";

interface Props {
  movie: { id: number; title: string; backdrop_path: string };
}

function Movie({ movie }: Props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const apiClient = new APIClient();
  const imgUrl: string = apiClient.fetchMovieImage(movie.backdrop_path) || "";

  const { likes } = useSelector((state: any) => state.likesSlice);

  debugger;
  let liked = false;
  likes.forEach((like: any) => {
    if (like.id === movie.id) {
      liked = like.islike;
    }
  });

  const handleMovieDetailClick = () => {
    navigate(`../details/${movie.id}`);
  };

  const handleLike = () => {
    const isLikedPayload = {
      id: movie.id,
      isLiked: !liked,
    };

    dispatch(setLike(isLikedPayload));
  };

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

export default Movie;
