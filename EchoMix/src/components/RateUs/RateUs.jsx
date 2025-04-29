import React, { useState } from 'react';
import { FaStar, FaMusic, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import './RateUs.css';
import NavBar from "../NavBar/NavBar";

const RateUs = () => {
  const [currentItem, setCurrentItem] = useState({
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    image: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    userRating: 0,
    averageRating: 4.2,
    totalRatings: 1245
  });

  const [recentlyRated, setRecentlyRated] = useState([
    { 
      id: 2, 
      title: "Circles", 
      artist: "Post Malone", 
      image: "https://i.scdn.co/image/ab67616d0000b2734f1c3e2a8d73f5b5bdf8b8c5", 
      userRating: 4 
    },
    { 
      id: 3, 
      title: "Watermelon Sugar", 
      artist: "Harry Styles", 
      image: "https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431", 
      userRating: 5 
    },
    { 
      id: 4, 
      title: "Don't Start Now", 
      artist: "Dua Lipa", 
      image: "https://i.scdn.co/image/ab67616d0000b273e0b5d5c5e5e5e5e5e5e5e5e5", 
      userRating: 3 
    }
  ]);

  const [hoverRating, setHoverRating] = useState(0);

  const recommendedItems = [
    { 
      id: 5, 
      title: "Levitating", 
      artist: "Dua Lipa", 
      image: "https://i.scdn.co/image/ab67616d0000b273f7b7174b6a7bc1c7cdd6b98b", 
      averageRating: 4.5 
    },
    { 
      id: 6, 
      title: "As It Was", 
      artist: "Harry Styles", 
      image: "https://i.scdn.co/image/ab67616d0000b2735a0b61b8b72be74b0ba6a4c4", 
      averageRating: 4.1 
    },
    { 
      id: 7, 
      title: "Sunflower", 
      artist: "Post Malone, Swae Lee", 
      image: "https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf", 
      averageRating: 4.3 
    },
    { 
      id: 8, 
      title: "Stay", 
      artist: "The Kid LAROI, Justin Bieber", 
      image: "https://i.scdn.co/image/ab67616d0000b2733f29a976eea00141514ab936", 
      averageRating: 4.0 
    },
    { 
      id: 9, 
      title: "Good 4 U", 
      artist: "Olivia Rodrigo", 
      image: "https://i.scdn.co/image/ab67616d0000b2731d03b5a88f070d8b37c672a1", 
      averageRating: 4.4 
    },
    { 
      id: 10, 
      title: "Save Your Tears", 
      artist: "The Weeknd", 
      image: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36", 
      averageRating: 4.2 
    }
  ];

  const handleRating = (rating) => {
    const updatedItem = { ...currentItem, userRating: rating };
    setCurrentItem(updatedItem);

    const newRecentlyRated = [
      { ...updatedItem, userRating: rating },
      ...recentlyRated.filter(item => item.id !== updatedItem.id)
    ].slice(0, 3);

    setRecentlyRated(newRecentlyRated);
  };

  const handleRateRecommended = (item) => {
    setCurrentItem({
      ...item,
      userRating: 0,
      totalRatings: Math.floor(Math.random() * 1000) + 100
    });
  };

  return (
      <div className="navi">
        <NavBar className="navBar"></NavBar>
    <div className="rate-us-container" style={{marginLeft:"100px"}}>
      <header className="rate-us-header">
        <h1><FaMusic /> Rate Us</h1>
        <p>Share your opinion on our content</p>
      </header>

      <div className="current-item-card fade-in">
        <img src={currentItem.image} alt={currentItem.title} className="item-image" />
        <div className="item-details">
          <h2>{currentItem.title}</h2>
          <p className="artist">{currentItem.artist}</p>

          <div className="community-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={`avg-${star}`}>
                  {star <= Math.floor(currentItem.averageRating) ? (
                    <FaStar className="filled" />
                  ) : star === Math.ceil(currentItem.averageRating) && currentItem.averageRating % 1 >= 0.5 ? (
                    <FaStarHalfAlt className="filled" />
                  ) : (
                    <FaRegStar className="empty" />
                  )}
                </span>
              ))}
            </div>
            <span className="rating-text">
              {currentItem.averageRating.toFixed(1)} ({currentItem.totalRatings} ratings)
            </span>
          </div>
        </div>

        <div className="user-rating-section">
          <h3>Your Rating</h3>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={`rate-${star}`}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                {(hoverRating || currentItem.userRating) >= star ? (
                  <FaStar className="filled" />
                ) : (
                  <FaRegStar className="empty" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
       <div>
      <div className="recent-section fade-in">
        <h2>Recently Rated</h2>
        <div className="recent-items-grid">
          {[...recentlyRated].reverse().map((item) => (
            <div key={`recent-${item.id}`} className="recent-item fade-in">
              <img src={item.image} alt={item.title} className="recent-item-image" />
              <div className="recent-item-details">
                <h3>{item.title}</h3>
                <p>{item.artist}</p>
                <div className="user-rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={`recent-${item.id}-${star}`}>
                      {star <= item.userRating ? (
                        <FaStar className="filled small" />
                      ) : (
                        <FaRegStar className="empty small" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <div className="recommendations-section fade-in">
        <h2>Recommended for Rating</h2>
        <div className="recommended-items-grid">
          {[...recommendedItems].reverse().map((item) => (
            <div key={`rec-${item.id}`} className="recommended-item fade-in">
              <img src={item.image} alt={item.title} className="recommended-item-image" />
              <div className="recommended-item-details">
                <h3>{item.title}</h3>
                <p>{item.artist}</p>
                <div className="recommended-rating">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={`rec-${item.id}-${star}`}>
                        {star <= Math.floor(item.averageRating) ? (
                          <FaStar className="filled xsmall" />
                        ) : star === Math.ceil(item.averageRating) && item.averageRating % 1 >= 0.5 ? (
                          <FaStarHalfAlt className="filled xsmall" />
                        ) : (
                          <FaRegStar className="empty xsmall" />
                        )}
                      </span>
                    ))}
                  </div>
                  <span className="rating-text">{item.averageRating.toFixed(1)}</span>
                </div>
                <button
                  className="rate-button"
                  onClick={() => handleRateRecommended(item)}
                >
                  Rate This
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div></div>
  );
};

export default RateUs;
