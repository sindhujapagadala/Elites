import React, { useContext, useState, useRef } from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navBar">
      <div className="libButtons">
        <div className="contTitle">Library</div>
        <li>Browse</li>
        <li>Artists</li>
        <li>Your Playlists</li>
        <li>Category</li>
      </div>
      <div className="myMusicContainer">
        <div className="contTitle">My music</div>
        <li>Recently Played</li>
        <li>My Songs</li>
        <li>Upload Song</li>
      </div>

      <div className="moreOptionContainer">
        <div className="contTitle">More options</div>
        <li>Contact us</li>
        <li>About us</li>
        <li>Rate us</li>
      </div>
    </div>
  );
}

export default NavBar;
