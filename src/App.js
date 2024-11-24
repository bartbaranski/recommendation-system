// src/App.js

import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecommendationCard from './RecommendationCard';

function App() {
  useEffect(() => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('sessionId', sessionId);
    }
  }, []);

  return (
    <div className="App">
      <h1>Welcome to the Recommendation System</h1>
      <RecommendationCard />
    </div>
  );
}

export default App;
