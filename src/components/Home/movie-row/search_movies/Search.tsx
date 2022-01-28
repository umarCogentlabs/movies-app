import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Search() {
  const [searchInput, setSearchMovie] = useState("");
  const [resultMovies, setResultMovies] = useState<any>();
  const filterSearchResult = (searchResult: []) => {
    // debugger;
    setResultMovies(searchResult || []);
  };

  useEffect(() => {
    const searchMoviesList = async () => {
      const searchApi = `${process.env.REACT_APP_SEARCH_URL}${searchInput}`;
      const searchData = await axios.get(searchApi);
      const searchResult = searchData.data.results;
      filterSearchResult(searchResult);
    };
    searchMoviesList();
  }, [searchInput]);

  let navigate = useNavigate();
  const sample_img_url: string = process.env.REACT_APP_IMAGE_URL || "";

  const handleSearchClick = (id: any) => {
    navigate(`../details/${id}`);
  };

  return (
    <>
      <div className='custom-dropdown'>
        <h3>Search Movies:</h3>
        <div className='dropdown'>
          <button className='dropbtn'>
            <div className='search-bar'>
              <input
                type='text'
                onChange={(event) => {
                  setSearchMovie(event.target.value);
                }}
              />
            </div>
          </button>
          <div className='dropdown-content'>
            {searchInput &&
              resultMovies?.map((movie: any) => {
                return (
                  <p
                    className='searched-row'
                    onClick={() => {
                      handleSearchClick(movie.id);
                    }}>
                    <div className='image'>
                      <img
                        src={`${sample_img_url}${movie?.backdrop_path}`}
                        alt='movie'
                      />
                    </div>
                    <div className='movie-details'>
                      <h4>{movie?.title}</h4>
                      <p className='release'>
                        {movie.release_date.slice(0, 4)}
                      </p>
                      <p className='release'>{movie.overview}</p>
                    </div>
                  </p>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
