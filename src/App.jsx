import React from 'react';
import Aboutus from './components/Aboutus/Aboutus'; 
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Upload from './components/Upload/Upload';
import Song from './components/song/Song';
import { UserProvider } from './UserContext/UserContext';
import Playlist from './components/playlist/PlaylistPage';
import Category from './components/Category/Category';
import Features from './components/Features/Features';
import Rateus from './components/Rateus/Rateus.jsx';
function App() {
  return (
    <>

      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LoginSignup />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/playlist' element={<Playlist />} />
            <Route path='/category' element={<Category />} />
            <Route path='/aboutus' element={<Aboutus />} /> 
            <Route path='/features' element={<Features />} />
            <Route path='/Rateus' element={<Rateus/>} />
          </Routes>
        </Router>
      </UserProvider>

    </>
  );
}

export default App;
