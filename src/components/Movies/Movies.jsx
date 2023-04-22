import React, { useContext } from 'react'
import { trendingContext } from '../Tvshows/Store'

export default function Movies() {
  let {trendingMovies, basicUrl}=useContext(trendingContext)
  return (
    <div className="row my-5">
      <div  className="col-md-4 mt-3">
        <div className="welcome">
          <div className={`brdr my-4 w-25`}></div>
          <h2>Trending</h2>
          <h2>Movies</h2>
          <h2>To watch now</h2>
          <p className='text-muted'>most watched movies by day</p>
          <div className={`brdr my-4 w-100`}></div>
        </div>
      </div>

      {trendingMovies.map((movie)=>
      <div  key={movie.id} className="col-md-2 mt-3">
        <div className="movie">
          <img className='img-fluid' src={basicUrl + movie.poster_path} alt="" />
          <h2 className="h6 my-2">{movie.title}</h2>
        </div>
      </div>
    
      )}
    </div> 
  )
}
