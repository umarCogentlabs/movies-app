import axios from "axios";

class APIClient {
  genereURL?: string;
  moviesURL?: string;
  movieDetailURL?: string;
  movieImageURL?: string;

  constructor() {
    this.genereURL = process.env.REACT_APP_GENERE_URL;
    this.moviesURL = process.env.REACT_APP_MOVIES_URL;
    this.movieDetailURL = process.env.REACT_APP_MOVIE_DETAILS;
    this.movieImageURL = process.env.REACT_APP_IMAGE_URL;
  }

  fecthMovies() {
    return axios.get(this.moviesURL || "");
  }

  fecthGeneres() {
    return axios.get(this.genereURL || "");
  }

  fecthMovieDetails(movieID: string) {
    let newURL = this.movieDetailURL?.replace("placeholder", movieID);
    console.log(newURL);
    return axios.get(newURL || "");
  }

  //not used yet
  fecthMovieImage(img: string) {
    let newURL = `${this.movieDetailURL}${img}`;
    return axios.get(newURL || "");
  }
}

export default APIClient;
