import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  function toUpload() {
    navigate("/upload");
  }

  function toCategory() {
    navigate("/category");
  }

  function toFeatures(){
    navigate('/features');
  }
  function toAboutUs() {
    navigate("/aboutus");
  }
  function toRateus() {
    navigate("/Rateus");
  }

  return (
    <div className="navBar">
      <div className="libButtons">
        <div className="contTitle">Library</div>
        <li>Browse</li>
        <li>Artists</li>
        <li>Your Playlists</li>
        <li onClick={toCategory}>Category</li>
      </div>

      <div className="myMusicContainer">
        <div className="contTitle">My Music</div>
        <li>Recently Played</li>
        <li>My Songs</li>
        <li onClick={toUpload}>Upload Song</li>
      </div>
      
      <div className="moreOptionContainer">

        <div className="contTitle">More options</div>
        <li>Contact us</li>
        <li onClick={toAboutUs}>About Us</li>
        <li onClick={toFeatures}>Features</li>
        <li onClick={toRateus}>Rate us</li>

      </div>
    </div>
  );
}

export default NavBar;
