import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import APIClient from "../../../../API_Data Fetch/index";

interface MyFormValues {
  comment: string;
}

export default function MovieDetail() {
  const [movieDetails, setMovieDetails] = useState<any>();
  let { movieId } = useParams<{ movieId: string }>();
  const username = localStorage.getItem("username") || "";

  // const addCommentField = (movie_details: any) => {
  //   movie_details.comments = [];
  //   setMovieDetails(movie_details);
  // };

  useEffect(() => {
    const apiClient = new APIClient();
    apiClient.fecthMovieDetails(movieId || "").then((res) => {
      const movie_details = res.data;
      movie_details.comments = [];
      setMovieDetails(movie_details);
    });
    debugger;
  }, []);

  const [comments, setComments] = useState<any>();
  let initialValues: MyFormValues = { comment: "" };
  const [initialValuesState, setInitialValues] = useState(initialValues);

  const handleComment = (values: MyFormValues, { resetForm }: any) => {
    resetForm({ values: initialValues });

    const commentWithUsername = {
      commentingUser: username,
      userComment: values.comment,
    };
    debugger;
    movieDetails.comments = [...movieDetails.comments, commentWithUsername];
    // debugger;
  };

  const CommentSchema = Yup.object().shape({
    comment: Yup.string().min(10, "Too Short!").required("Required"),
  });

  return (
    <div className="movie-detail-container">
      <div className="top-bar-container">
        <div className="image-div">
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}${movieDetails?.backdrop_path}`}
            alt=""
          />
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
        {/* <h3>Comments:</h3> */}

        {movieDetails?.comments?.map((comment: any, i: number) => {
          debugger;
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
