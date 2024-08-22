import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Groups from "./components/Groups";
import Dashboard from "./components/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  return (
    <div className='min-vh-100 min-vw-100 d-flex'>
      <div style={{width:'20%'}}></div>
      <Routes>
      <Route path="/groups" element={<Groups/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>

    </div>
    
  )
}

export default App

