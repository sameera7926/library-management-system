import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './Splash';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Bookmarks from './pages/Bookmarks';
import Account from './pages/Account';
import './index.css';

// The Landing component wraps Splash and Login in a smooth scrolling container like before
function Landing() {
  const loginRef = useRef(null);
  
  const scrollToLogin = () => {
    if (loginRef.current) {
      loginRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      <Splash onScrollDown={scrollToLogin} />
      <div ref={loginRef}>
        <Login />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
