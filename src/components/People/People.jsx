import React, { useContext } from 'react'
import { trendingContext } from '../Tvshows/Store'

export default function People() {

  let {trendingPeople, basicUrl}=useContext(trendingContext)
  return (
    
    <div className="row my-4">
      <div className="col-md-4">
        <div className="welcome">
          <div className={`brdr my-4 w-25`}></div>
          <h2>Trending</h2>
          <h2>People</h2>
          <h2>To watch now</h2>
          <p className='text-muted'>most watched people by day</p>
          <div className={`brdr my-4 w-100`}></div>
        </div>
      </div>

      {trendingPeople.map((person)=>
      <div  key={person.id} className="col-md-2">
        <div className="people">
          <img className='img-fluid ' src={basicUrl + person.profile_path} alt="" />
          <h2 className="h6 my-2">{person.name}</h2>
        </div>
      </div>
      
      )}
    </div>

    )
}
