import React from 'react';
import Login from './components/Login/Login';
import {Route, Routes} from 'react-router-dom';
import Registration from './components/Registration/Registration';
import ShortLinks from './components/ShortLinks/ShortLinks';

const App: React.FC = React.memo(() => {
  return (
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/short-links' element={<ShortLinks/>}/>
      </Routes>
  );
})

export default App;
