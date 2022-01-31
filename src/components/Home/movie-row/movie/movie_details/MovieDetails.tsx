import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import APIClient from "../../../../API_Data_Fetch/index";

interface MyFormValues {
  comment: string;
}

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState<any>();
  let { movieId } = useParams<{ movieId: string }>();
  const username = localStorage.getItem("username") || "";
  const apiClient = new APIClient();
  const imgUrl: string =
    apiClient.fetchMovieImage(movieDetails?.backdrop_path) || "";
  const [comments, setComments] = useState<any>();

  useEffect(() => {
    apiClient.fetchMovieDetails(movieId || "").then((res) => {
      const movie_details = res.data;
      if (!movie_details.comments) movie_details.comments = [];
      setMovieDetails(movie_details);
    });
  }, []);

  let initialValues: MyFormValues = { comment: "" };
  const [initialValuesState, setInitialValues] = useState(initialValues);

  const handleComment = (values: MyFormValues, { resetForm }: any) => {
    resetForm({ values: initialValues });

    const commentWithUsername = {
      commentingUser: username,
      userComment: values.comment,
    };

    movieDetails.comments = [...movieDetails.comments, commentWithUsername];
  };

  const CommentSchema = Yup.object().shape({
    comment: Yup.string()
      .min(10, "Too Short!")
      .required("Comment field cannot be empty"),
  });

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

        {movieDetails?.comments?.map((comment: any, i: number) => {
          return (
            <div key={i} className="comment-section">
              <p className="username">{comment.commentingUser}:</p>
              {/* <p className="comment">{comment.userComment}</p> */}
            </div>
          );
        })}

        <Formik
          initialValues={initialValuesState}
          enableReinitialize={true}
          validationSchema={CommentSchema}
          onSubmit={handleComment}>
          {({ errors, touched }) => (
            <Form>
              <label htmlFor="comment">Comment:</label>
              <Field id="comment" name="comment" placeholder="Comment" />
              {errors.comment && touched.comment ? (
                <div>{errors.comment}</div>
              ) : null}

              <button type="submit"> Comment</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
