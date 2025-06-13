import React, { useState, useEffect } from 'react';
import { FaStar, FaRegSmile, FaRegFrown, FaRegMeh, FaRocket, FaHeart, FaRegStar, FaTrophy } from 'react-icons/fa';
import Confetti from 'react-confetti';
import './Rateus.css';

const Rateus = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const emojis = [
        { icon: <FaRegFrown />, label: 'Poor' },
        { icon: <FaRegMeh />, label: 'Average' },
        { icon: <FaRegSmile />, label: 'Good' },
        { icon: <FaHeart />, label: 'Great' },
        { icon: <FaTrophy />, label: 'Excellent' }
    ];

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating > 0 && name.trim() !== '') {
            setIsSubmitting(true);
            try {
                const res = await fetch('http://localhost:8080/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: name.trim(),
                        message: feedback.trim(),
                    }),
                });

                if (res.ok) {
                    console.log('Review submitted');
                    setSubmitted(true);
                    if (rating >= 4) {
                        setShowConfetti(true);
                    }
                } else {
                    console.error('Failed to submit review');
                }
            } catch (err) {
                console.error('Error:', err);
            }
            setIsSubmitting(false);
        } else {
            alert('Please provide your name and a rating.');
        }
    };

    const resetRating = () => {
        setRating(0);
        setHover(null);
        setSubmitted(false);
        setFeedback('');
        setName('');
        setShowConfetti(false);
        setSelectedEmoji(null);
    };

    const getEmoji = () => {
        if (rating === 1) return emojis[0];
        if (rating === 2) return emojis[1];
        if (rating === 3) return emojis[2];
        if (rating === 4) return emojis[3];
        if (rating === 5) return emojis[4];
        return emojis[0];
    };

    const handleEmojiSelect = (index) => {
        const starRating = index + 1;
        setSelectedEmoji(index);
        setRating(starRating);
    };

    if (submitted) {
        return (
            <div className="rateus-page-wrapper">
                <div className="rateus-container submitted">
                    {showConfetti && (
                        <Confetti
                            width={windowSize.width}
                            height={windowSize.height}
                            recycle={false}
                            numberOfPieces={500}
                            gravity={0.2}
                            colors={['#cd7f32', '#b87333', '#aa6c39', '#a97142']}
                        />
                    )}

                    <div className="thank-you-message animate-scale-in">
                        <div className="emoji animate-bounce">
                            {getEmoji().icon}
                        </div>
                        <h2 className="animate-slide-up">Thank You, {name}!</h2>
                        <p className="animate-slide-up-delay">
                            We appreciate your {rating}-star rating ({getEmoji().label}){feedback && ' and feedback'}!
                        </p>

                        <button
                            onClick={resetRating}
                            className="rate-again-btn animate-fade-in"
                        >
                            Rate Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rateus-page-wrapper">
            <div className="rateus-container animate-fade-in-up">
                <div className="rateus-left">
                    <h2 className="animate-fade-in-up-delay">Rate Your Experience</h2>
                    <p className="animate-fade-in-up-delay-2">How would you rate your experience with us?</p>

                    <div className="emoji-selector animate-fade-in">
                        {emojis.slice(0, 5).map((emoji, index) => (
                            <div
                                key={index}
                                className={`emoji-option ${selectedEmoji === index ? 'selected' : ''} animate-emoji`}
                                style={{ transitionDelay: `${index * 0.1}s` }}
                                onClick={() => handleEmojiSelect(index)}
                            >
                                {emoji.icon}
                                <span>{emoji.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="emoji-preview">
                        {rating > 0 ? (
                            <div className="rating-display animate-scale-in">
                                {getEmoji().icon}
                                <span className="animate-scale-in-delay">
                                    {rating} star{rating > 1 ? 's' : ''} ({getEmoji().label})
                                </span>
                            </div>
                        ) : (
                            <p className="prompt-text animate-pulse">
                                Select your rating
                            </p>
                        )}
                    </div>
                </div>

                <div className="rateus-right">
                    <form onSubmit={handleSubmit}>
                        <div className="stars animate-fade-in">
                            {[...Array(5)].map((_, index) => {
                                const currentRating = index + 1;
                                return (
                                    <label
                                        key={index}
                                        className="star-label"
                                        style={{ transitionDelay: `${index * 0.1}s` }}
                                    >
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={currentRating}
                                            onClick={() => {
                                                setRating(currentRating);
                                                setSelectedEmoji(currentRating - 1);
                                            }}
                                            className="visually-hidden"
                                        />
                                        <div className={`star-container ${currentRating <= (hover || rating) ? 'active' : ''}`}>
                                            {currentRating <= (hover || rating) ? (
                                                <FaStar className="star active" />
                                            ) : (
                                                <FaRegStar className="star" />
                                            )}
                                        </div>
                                    </label>
                                );
                            })}
                        </div>

                        <div className="name-section animate-fade-in">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="focus-effect"
                            />
                        </div>

                        <div className="feedback-section animate-fade-in">
                            <label htmlFor="feedback">Your feedback (optional)</label>
                            <textarea
                                id="feedback"
                                placeholder="What did you enjoy or what could we improve?"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="feedback-input focus-effect"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`submit-btn ${rating === 0 || name.trim() === '' ? 'disabled' : ''} animate-fade-in`}
                            disabled={rating === 0 || name.trim() === '' || isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="animate-pulse">
                                    Submitting...
                                </span>
                            ) : (
                                <>
                                    Submit Rating
                                    {rating >= 4 && (
                                        <div className="rocket-animation">
                                            <FaRocket className="rocket-icon" />
                                        </div>
                                    )}
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Rateus;