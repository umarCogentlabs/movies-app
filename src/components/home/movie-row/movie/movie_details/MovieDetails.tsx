import { useEffect } from "react";
import { useParams } from "react-router";
import APIClient from "../../../../common/API/index";
import Comments from "./Comments";
import { useDispatch, connect, useSelector } from "react-redux";
import { setMovieDetailsArray } from "../../../../../redux-toolkit/movieDetailsSlice";
import { setComment } from "../../../../../redux-toolkit/commentsSlice";

interface MyFormValues {
  comment: string;
}

export default function MovieDetails() {
  let { movieId } = useParams<{ movieId: string }>();
  const username = localStorage.getItem("username") || "";
  const apiClient = new APIClient();
  const dispatch = useDispatch();
  const { movieDetails } = useSelector((state: any) => state.movieDetailsSlice);
  const { comments } = useSelector((state: any) => state.commentsSlice);
  const imgUrl: string =
    apiClient.fetchMovieImage(movieDetails?.backdrop_path) || "";

  let movieComments: any[] = [];
  comments?.forEach((movie: any) => {
    if (movie.id === movieDetails.id) {
      movieComments = movie.comment;
    }
  });

  useEffect(() => {
    apiClient.fetchMovieDetails(movieId || "").then((res) => {
      const movieDetailsData = res.data;
      movieDetailsData.comments = [];
      dispatch(setMovieDetailsArray(movieDetailsData));
    });
  }, []);

  const handleComment = (values: MyFormValues, { resetForm }: any) => {
    resetForm();

    const commentWithUsername = {
      commentingUser: username,
      userComment: values.comment,
    };

    const commentPayload = {
      id: movieDetails.id,
      comment: commentWithUsername,
    };

    dispatch(setComment(commentPayload));
  };

  return (
    <div className="movie-detail-container">
      <div className="top-bar-container">
        <div className="image-div">
          <img src={imgUrl} alt="hi" />
        </div>
        <div className="details">
          <h1>{movieDetails?.title}</h1>
          <div className="info">
            <span className="release-date">{movieDetails?.release_date}</span>
          </div>
          <div className="overview">
            <h4>Overview:</h4>
            <p>{movieDetails?.overview}</p>
          </div>
        </div>
      </div>
      <div className="commments">
        <h3>Comments:</h3>

        {movieComments?.map((comment: any, i: number) => {
          return (
            <div key={i} className="comment-section">
              <p className="username">{comment.commentingUser}:</p>
              <p className="comment">{comment.userComment}</p>
            </div>
          );
        })}

        <Comments handleComment={handleComment} />
      </div>
    </div>
  );
}
