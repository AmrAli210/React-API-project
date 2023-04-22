import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Details() {
  
  let [searchParams,setSearchParams]=useSearchParams();
  let [movieDetails,setMovieDetails]=useState({});
  // let [tvshowDetails,setTvshowDetails]=useState({});
  // let [personDetails,setPersonDetails]=useState({});
  let currentId = searchParams.get('id');
  let basicUrl ='https://image.tmdb.org/t/p/original';

  async function getTrendingDetails(mediaType){
   let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${currentId}?api_key=c636ed7787cc302d96bf88ccf334e0d8&language=en-US`);
      
    setMovieDetails(data);
  }
  useEffect(()=>{
    getTrendingDetails('movie');
  },[])

  return (
    <>
  <div className="row my-4">
      <div key={movieDetails.id} className="col-md-4">
      <div className="img-holder ">
      <img className='img-fluid' src={basicUrl + movieDetails.poster_path} alt="" />
      </div>
      </div>
      <div className="col-md-8">
        <div className="movie-info">
          <h2>{movieDetails.title}</h2>
          <h5 className='my-3'> Vote : {movieDetails.vote_average}</h5>
          <h5 className='my-3'> Vote count : {movieDetails.vote_count}</h5>
          <h5 className='my-3'> popularity : {movieDetails.popularity}</h5>
          <h5 className='my-3'> release_date : {movieDetails.release_date}</h5>
          <h4 className='text-muted'>{movieDetails.overview}</h4>
        </div>
      </div>
    </div>

 {/* <div className="row">
    <div key={tvshowDetails.id} className="col-md-4">
    <div className="img-holder my-4">
    <img className='img-fluid' src={basicUrl + tvshowDetails.poster_path} alt="" />
    </div>
    </div>
    <div className="col-md-8">
      <div className="tvshows-info">
        <h2>{tvshowDetails.title}</h2>
        <h5 className='my-3'> Vote : {tvshowDetails.vote_average}</h5>
        <h5 className='my-3'> Vote count : {tvshowDetails.vote_count}</h5>
        <h5 className='my-3'> popularity : {tvshowDetails.popularity}</h5>
        <h5 className='my-3'> release_date : {tvshowDetails.release_date}</h5>
        <h4 className='text-muted'>{tvshowDetails.overview}</h4>
      </div>
    </div>
  </div> */}

  {/* <div className="row">
    <div key={personDetails.id} className="col-md-4">
    <div className="img-holder my-4">
    <img className='img-fluid ' src={basicUrl + personDetails.profile_path} alt="" />
    </div>
    </div>
    <div className="col-md-8">
    <div className="tvshows-info">
      <h2>{personDetails.name}</h2>
      <h5 className='my-3'> biography : {personDetails.biography}</h5>
      <h5 className='my-3'> place_of_birth : {personDetails.place_of_birth}</h5>
      <h5 className='my-3'> birthday : {personDetails.birthday}</h5>
      <h5 className='my-3'> popularity : {personDetails.popularity}</h5>
    </div>
  </div>
  </div> */}

    </>
  )

}
