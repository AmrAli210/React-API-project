import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Movies from './components/Movies/Movies';
import Tvshows from './components/Tvshows/Tvshows';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Details from './components/Details/Details';
import People from './components/People/People';
import Networks from './components/Networks/Networks';
import Notfound from './components/Notfound/Notfound';
import { Routes,Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import TrendingContextProvider from './components/Tvshows/Store';
function App() {

let [userData,setUserData]=useState(null)
let navigate=useNavigate();

function saveUserData()
{
  let encodedToken = localStorage.getItem('userToken');
  let decodedToken = jwtDecode(encodedToken);
  setUserData(decodedToken);
} 

function logout()
{ 
  localStorage.removeItem('userToken');
  setUserData(null);
  navigate('/login');
}

useEffect (()=>{
  if(localStorage.getItem('userToken')!=null)
  {
    saveUserData()
  }
},[]);

function ProtectedRoute(props)
{
  if(localStorage.getItem('userToken')==null)
  {
   return <Navigate to='/login'/>
  }
  else
  {
    return props.children;
  }

}

  return (
    <>
     <Navbar userData={userData} logout={logout} />
     <div className="container my-5"> 
    <TrendingContextProvider>
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}></Route>
      <Route path='about' element={<About/>}></Route>
      <Route path='tvshows' element={<ProtectedRoute><Tvshows/></ProtectedRoute>}></Route>
      <Route path='login' element={<Login saveUserData={saveUserData}/>}></Route>
      <Route path='register' element={<Register/>}></Route>
      <Route path='details' element={<ProtectedRoute><Details/></ProtectedRoute>}></Route>
      <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>}></Route>
      <Route path='networks' element={<Networks/>}></Route>
      <Route path='*' element={<Notfound/>}></Route>
     </Routes>
    </TrendingContextProvider>
     </div>
    </>
  );
}

export default App;
