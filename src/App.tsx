import React, {useEffect} from 'react';
import Login from './components/Login/Login';
import {Route, Routes} from 'react-router-dom';
import Registration from './components/Registration/Registration';
import ShortLinks from './components/ShortLinks/ShortLinks';
import {linksAPI} from './api/linksAPI';

function App() {


  return (
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/short-links' element={<ShortLinks/>}/>
      </Routes>
  );
}

export default App;
