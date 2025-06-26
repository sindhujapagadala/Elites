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
  function toContactUs(){
    navigate("/contactUsPage");
  }

  function toBrowse(){
    navigate("/browse");
  }

  function toRateUs(){
    navigate("/rateus");
  }

  function toLikedSongs(){
    navigate("/liked");
  }


  function toArtists(){
    navigate("/artists");
  }

  function toHome() {
    navigate("/home");
  }

  function toRecentlyPlayed() {
    navigate("/recentlyPlayed");
  }

  function toMySongs() {
    navigate("/mySongs");
  }


  return (
    <div className="navBar">
      <div className="libButtons">
        <div className="contTitle">Library</div>
        <li onClick={toHome}>Home</li>
        <li onClick={toBrowse}>Browse</li>
        <li onClick={toArtists}>Artists</li>
        <li onClick={toCategory}>Category</li>
      </div>

      <div className="myMusicContainer">
        <div className="contTitle">My Music</div>
        <li onClick={toRecentlyPlayed}>Recently Played</li>
        <li onClick={toMySongs}>My Songs</li>
        <li onClick={toLikedSongs}>Liked Songs</li>
        <li onClick={toUpload}>Upload Song</li>
      </div>
      
      <div className="moreOptionContainer">

        <div className="contTitle">More options</div>
        <li onClick={toContactUs}>Contact us</li>
        <li onClick={toAboutUs}>About Us</li>
        <li onClick={toFeatures}>Features</li>
        <li onClick={toRateUs}>Rate us</li>

      </div>
    </div>
  );
}

export default NavBar;
