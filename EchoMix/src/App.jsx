import React from 'react';
import Aboutus from './components/Aboutus/Aboutus'; 
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Upload from './components/Upload/Upload';
import Song from './components/song/Song'
import { Nav } from 'react-bootstrap';
import { UserProvider } from './UserContext/UserContext';
import WatchLaterPage from './pages/WatchLaterPage';




function App() {
  return (
    <>
    <UserProvider>
    <Router>
      <Routes>
        <Route path='/' element={<LoginSignup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/upload' element={<Upload></Upload>}></Route>
        <Route path="/watch-later" element={<WatchLaterPage />} />
      </Routes>
    </Router>
    </UserProvider>
    </>
  );
}

export default App;
