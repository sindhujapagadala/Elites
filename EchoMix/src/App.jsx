import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import CustomNavbar from './components/Navbar';
import SongInfo from './components/SongInfo';
import Player from './components/Player';

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      <CustomNavbar />
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 150px)',
        paddingBottom: '4rem'
      }}>
        <SongInfo />
        <Player />
      </main>
    </div>
  );
}

export default App;