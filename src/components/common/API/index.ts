import axios from "axios";

class APIClient {
  genreUrl?: string;
  moviesUrl?: string;
  movieDetailUrl?: string;
  movieImageUrl?: string;

  constructor() {
    this.genreUrl = process.env.REACT_APP_GENERE_URL;
    this.moviesUrl = process.env.REACT_APP_MOVIES_URL;
    this.movieDetailUrl = process.env.REACT_APP_MOVIE_DETAILS;
    this.movieImageUrl = process.env.REACT_APP_IMAGE_URL;
  }

  fetchMovies() {
    return axios.get(this.moviesUrl || "");
  }

  fetchGeneres() {
    return axios.get(this.genreUrl || "");
  }

  fetchMovieDetails(movieID: string) {
    let newURL = this.movieDetailUrl?.replace("placeholder", movieID);
    return axios.get(newURL || "");
  }

  fetchMovieImage(img: string) {
    let newURL = `${this.movieImageUrl}${img}`;
    return newURL;
  }
}

export default APIClient;
