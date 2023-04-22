import React, { useContext } from 'react'
import { trendingContext } from './Store'

export default function Tvshows() {
  let {trendingTvshows, basicUrl}=useContext(trendingContext)
  return (
    <div className="row my-4">
    <div className="col-md-4">
      <div className="welcome">
        <div className={`brdr my-4 w-25`}></div>
        <h2>Trending</h2>
        <h2>Tv Shows</h2>
        <h2>To watch now</h2>
        <p className='text-muted'>most watched tv by day</p>
        <div className={`brdr my-4 w-100`}></div>
      </div>
    </div>

    {trendingTvshows.map((tv)=>
    <div  key={tv.id} className="col-md-2">
      <div className="tv">
        <img className='img-fluid ' src={basicUrl + tv.poster_path} alt="" />
        <h2 className="h6 my-2">{tv.name}</h2>
      </div>
    </div>
    
    )}
  </div>

  )
}
