import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import APIClient from "../../../../common/API/index";
import Comments from "./Comments";
import { useDispatch, connect } from "react-redux";
import {
  SET_COMMENT,
  SET_MOVIE_DETAILS,
} from "../../../../common/redux-constants/index";

function setMovieDetailsArray(payload: object[]) {
  return { type: SET_MOVIE_DETAILS, payload };
}

function setComments(payload: {}) {
  return { type: SET_COMMENT, payload };
}

interface MyFormValues {
  comment: string;
}

function MovieDetails({ genereWithMoviesList, userComments }: any) {
  let { movieId } = useParams<{ movieId: string }>();
  const username = localStorage.getItem("username") || "";
  const apiClient = new APIClient();
  const imgUrl: string =
    apiClient.fetchMovieImage(genereWithMoviesList?.backdrop_path) || "";
  const dispatch = useDispatch();

  let movieComments: any[] = [];
  userComments?.forEach((likeComment: any) => {
    if (likeComment.id === genereWithMoviesList.id) {
      movieComments = likeComment.comment;
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
      id: genereWithMoviesList.id,
      comment: commentWithUsername,
    };

    dispatch(setComments(commentPayload));
  };

  return (
    <div className="movie-detail-container">
      <div className="top-bar-container">
        <div className="image-div">
          <img src={imgUrl} alt="hi" />
        </div>
        <div className="details">
          <h1>{genereWithMoviesList?.title}</h1>
          <div className="info">
            <span className="release-date">
              {genereWithMoviesList?.release_date}
            </span>
          </div>
          <div className="overview">
            <h4>Overview:</h4>
            <p>{genereWithMoviesList?.overview}</p>
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

const mapStateToProps = (state: any) => {
  return {
    genereWithMoviesList: state.setMovieDetailsArray,
    userComments: state.setComments,
  };
};

export default connect(mapStateToProps)(MovieDetails);
