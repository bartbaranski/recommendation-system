// src/RatingComponent.js

import React, { useState } from 'react';
import axios from 'axios';

function RatingComponent() {
  const [itemId, setItemId] = useState('');
  const [rating, setRating] = useState('');

  const submitRating = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/rate/', {
      item: itemId,
      rating: rating,
    })
    .then(response => {
      console.log(response.data);
      // Optionally clear the form or display a success message
    })
    .catch(error => {
      console.error(error.response ? error.response.data : error.message);
    });
  };

  return (
    <form onSubmit={submitRating}>
      <h2>Rate an Item</h2>
      <input
        type="number"
        value={itemId}
        onChange={e => setItemId(e.target.value)}
        placeholder="Item ID"
        required
      />
      <input
        type="number"
        value={rating}
        onChange={e => setRating(e.target.value)}
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        required
      />
      <button type="submit">Submit Rating</button>
    </form>
  );
}

export default RatingComponent;
