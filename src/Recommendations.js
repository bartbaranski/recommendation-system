// src/Recommendations.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/recommendations/')
      .then(response => {
        setRecommendations(response.data);
      })
      .catch(error => {
        console.error(error.response ? error.response.data : error.message);
      });
  }, []);

  return (
    <div>
      <h2>Recommended Items</h2>
      <ul>
        {recommendations.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
