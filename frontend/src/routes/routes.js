import React, { } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import ParkingList from '../components/ParkingList';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ProtectedRoutes from './protectedRoutes';



export const AppRoutes = (props) => {
  return (
    <Routes>
      <Route path='/login' element={<Login {...props} />} />
      <Route path='/signup' element={<Signup {...props} />} />
      <Route element={<ProtectedRoutes {...props}/>}>
        <Route exact path='/' element={<Home {...props} />} />
        <Route path='/home' element={<Home {...props} />} />  
        <Route path='/dashboard/' element={<Dashboard {...props} />} />
        <Route path='/parkinglist/' element={<ParkingList {...props} />} />
      </Route>

    </Routes>
  )
}