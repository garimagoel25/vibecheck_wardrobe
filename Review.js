import React, { useState } from 'react';
import axios from 'axios';

const Review = ({ itemId }) => {
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  // Fetch reviews for the item
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/items/${itemId}/reviews`);
      setReviews(response.data);
    } catch (error) {
      setError('Failed to fetch reviews');
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newReview = { content, rating };
      await axios.post(`/api/items/${itemId}/reviews`, newReview);
      setContent('');
      setRating(0);
      fetchReviews(); // Refresh the reviews list
    } catch (error) {
      setError('Failed to submit review');
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Review:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
      <div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id}>
              <p>{review.content}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default Review;
