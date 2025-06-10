import React, { useState } from 'react';
import { FaStar, FaRegSmile, FaRegFrown, FaRegMeh } from 'react-icons/fa';
import './Rateus.css';

const RateUs = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating > 0) {
            setSubmitted(true);
            // Here you would typically send the rating and feedback to your backend
            console.log({ rating, feedback });
        }
    };

    const resetRating = () => {
        setRating(0);
        setHover(null);
        setSubmitted(false);
        setFeedback('');
    };

    const getEmoji = () => {
        if (rating <= 2) return <FaRegFrown className="emoji" />;
        if (rating === 3) return <FaRegMeh className="emoji" />;
        return <FaRegSmile className="emoji" />;
    };

    if (submitted) {
        return (
            <div className="rateus-container submitted">
                <div className="thank-you-message">
                    {getEmoji()}
                    <h2>Thank You!</h2>
                    <p>We appreciate your {rating}-star rating{feedback && ' and feedback'}!</p>
                    <button onClick={resetRating} className="rate-again-btn">
                        Rate Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="rateus-container">
            <div className="rateus-left">
                <h2>Rate Your Experience</h2>
                <p>How would you rate your experience with us?</p>
                <div className="emoji-preview">
                    {rating > 0 ? (
                        <>
                            {getEmoji()}
                            <span>{rating} star{rating > 1 ? 's' : ''}</span>
                        </>
                    ) : (
                        <p>Select your rating</p>
                    )}
                </div>
            </div>

            <div className="rateus-right">
                <form onSubmit={handleSubmit}>
                    <div className="stars">
                        {[...Array(5)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={currentRating}
                                        onClick={() => setRating(currentRating)}
                                    />
                                    <FaStar
                                        className="star"
                                        color={currentRating <= (hover || rating) ? '#cd7f32' : '#e0d6c9'}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                        size={30}
                                    />
                                </label>
                            );
                        })}
                    </div>

                    <div className="feedback-section">
                        <label htmlFor="feedback">Your feedback (optional)</label>
                        <textarea
                            id="feedback"
                            placeholder="What did you enjoy or what could we improve?"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={rating === 0}
                    >
                        Submit Rating
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RateUs;