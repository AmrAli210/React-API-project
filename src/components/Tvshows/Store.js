import axios from "axios";
import { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export let trendingContext= createContext(0)

export default function TrendingContextProvider(props)
{
    let [trendingMovies, setTrendingMovies]= useState([]);
    let [trendingTvshows, setTrendingTvshows]= useState([]);
    let [trendingPeople, setTrendingPeople]= useState([]);
    let basicUrl ='https://image.tmdb.org/t/p/original/';
  
    async function getTrendingItems(mediaType,callback){
  
      let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=c636ed7787cc302d96bf88ccf334e0d8`)
      callback(data.results);

    }

    let navigate=useNavigate()

    function goToDetails(id)
    {
      navigate({
        pathname:'/details',
        search:`?id=${id}`,
      })
    } 
    useEffect(()=>
    {
      getTrendingItems('movie',setTrendingMovies);
      getTrendingItems('tv',setTrendingTvshows);
      getTrendingItems('person',setTrendingPeople);
  
    },[])
    
 return(

<trendingContext.Provider value={{trendingMovies, trendingTvshows, trendingPeople, basicUrl , goToDetails}}>
 {props.children}
</trendingContext.Provider>

 )  
}