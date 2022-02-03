import { useNavigate } from "react-router";
import APIClient from "../../../common/API/index";
import { useDispatch, connect } from "react-redux";
import { SET_LIKE } from "../../../common/redux-constants";

interface Props {
  movie: { id: number; title: string; backdrop_path: string };
  likes: any[];
}

function setLike(payload: {}) {
  return { type: SET_LIKE, payload };
}

function Movie({ movie, likes }: Props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const apiClient = new APIClient();
  const imgUrl: string = apiClient.fetchMovieImage(movie.backdrop_path) || "";

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

const mapStateToProps = (state: any) => {
  return {
    likes: state.setLikes,
  };
};

export default connect(mapStateToProps)(Movie);
