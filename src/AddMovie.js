// src/AddMovie.js

import React, { useState } from 'react';
import axios from 'axios';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://127.0.0.1:8000/api/movies/add/';
    const formData = new FormData();
    formData.append('title', title);
    if (image) {
      formData.append('image', image);
    }

    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('Movie added:', response.data);
      setTitle('');
      setImage(null);
      // Optionally, refresh the list or show a success message
    })
    .catch(error => {
      console.error('Error adding movie:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Movie</h2>
      <div>
        <label>Title:</label><br />
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image:</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
}

export default AddMovie;
