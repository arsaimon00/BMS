import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Showroom from './pages/Showroom';
import Bakery from './pages/Bakery';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/showroom" element={<Showroom />} />
        <Route path="/bakery" element={<Bakery />} />
      </Routes>
    </div>
  );
};

export default App;
