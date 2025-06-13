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

  function toArtists(){
    navigate("/artists");
  }

  function toHome() {
    navigate("/home");
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
        <li>Recently Played</li>
        <li>My Songs</li>
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
