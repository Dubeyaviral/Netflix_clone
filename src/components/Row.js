import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../axios";
import '../Row.css';
import YouTube from "react-youtube";
// @ts-ignore
import movieTrailer from 'movie-trailer';
 movieTrailer( 'Up' );
//=> https://www.youtube.com/watch?v=...
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '99%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie)=> {
    if(trailerUrl){
      setTrailerUrl("");
    }else{
      movieTrailer(movie,{
        tmdbId:movie.id
      }, (error,response)=>{
        if(!error){ setTrailerUrl(response);
          console.log(trailerUrl)
        }
        else{
          console.log(error);
        }

      })
      }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return <img
              key={movie.id}
              onClick={()=> handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`}
              alt={movie.name}
            />
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
