import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface MyFormValues {
  comment: string;
}

export default function MovieDetail() {
  const [movieDetails, setMovieDetails] = useState<any>();
  let { movieId } = useParams<{ movieId: string }>();
  let movieIdInt = parseInt(movieId || "");
  // const id: number = +movieId;

  const saveMovieDetails = (movieDetailsGet: {}) => {
    setMovieDetails(movieDetailsGet);
  };
  const [image_url, setImage_url] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      const movie_details_URL = `https://api.themoviedb.org/3/movie/${movieIdInt}?api_key=4ce6fff0da52d2214a794776a6bba549`;
      try {
        const movieDetailsGet = await axios.get(movie_details_URL);
        saveMovieDetails(movieDetailsGet.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovieDetails();
  }, []);

  //formik
  const [comments, setComments] = useState<MyFormValues[]>([]);
  let initialValues: MyFormValues = { comment: "" };
  const [initialValuesState, setInitialValues] = useState(initialValues);

  const handleSubmit = (values: MyFormValues, { resetForm }: any) => {
    resetForm({ values: initialValues });
    setComments([...comments, { comment: values.comment }]);
  };

  const CommentSchema = Yup.object().shape({
    comment: Yup.string().min(10, "Too Short!").required("Required"),
  });

  return (
    <div className='movie-detail-container'>
      <div className='top-bar-container'>
        <div className='image-div'>
          <img
            src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieDetails?.backdrop_path}`}
            alt=''
          />
        </div>
        <div className='details'>
          <h1>{movieDetails?.title}</h1>
          <div className='info'>
            <span className='release-date'>{movieDetails?.release_date}</span>
            {/* <span className='release-date'>{movieDetails?.release_date}</span> */}
            {/* {movieDetails?.generes.map((genere?: any) => {
              return <span>{genere.name} </span>;
            })} */}
          </div>
          <div className='overview'>
            <h4>Overview:</h4>
            <p>{movieDetails?.overview}</p>
          </div>
        </div>
      </div>
      <div className='commments'>
        <h3>Comments:</h3>

        {comments?.map((comment) => {
          return (
            <div className='comment-section'>
              <p className='username'>Umar:</p>
              <p className='comment'>{comment.comment}</p>
            </div>
          );
        })}

        <Formik
          initialValues={initialValuesState}
          enableReinitialize={true}
          validationSchema={CommentSchema}
          onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form>
              <label htmlFor='comment'>Comment:</label>
              <Field id='comment' name='comment' placeholder='Comment' />
              {errors.comment && touched.comment ? (
                <div>{errors.comment}</div>
              ) : null}

              <button type='submit'> Comment</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
