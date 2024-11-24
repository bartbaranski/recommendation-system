// src/RecommendationCard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecommendationCard() {
  const [currentItem, setCurrentItem] = useState(null);
  const [ratedItemsCount, setRatedItemsCount] = useState(0);
  const [finalRecommendations, setFinalRecommendations] = useState([]);
  const maxRatings = 5; // Number of items the user needs to rate before getting a recommendation

  useEffect(() => {
    fetchNextItem();
  }, []);

  const fetchNextItem = () => {
    const sessionId = localStorage.getItem('sessionId');
    axios
      .get('http://127.0.0.1:8000/api/next-item/', {
        params: { session_id: sessionId },
      })
      .then((response) => {
        setCurrentItem(response.data);
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
      });
  };

  const handleResponse = (ratingValue) => {
    if (!currentItem) return;

    const sessionId = localStorage.getItem('sessionId');

    axios
      .post('http://127.0.0.1:8000/api/rate/', {
        item: currentItem.id,
        rating: ratingValue,
        session_id: sessionId,
      })
      .then((response) => {
        setRatedItemsCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount >= maxRatings) {
            // Fetch final recommendation
            fetchFinalRecommendation(sessionId);
          } else {
            // Move to the next item after recording the response
            fetchNextItem();
          }
          return newCount;
        });
      })
      .catch((error) => {
        console.error('Error submitting rating:', error);
      });
  };

  const fetchFinalRecommendation = (sessionId) => {
    axios
      .get('http://127.0.0.1:8000/api/final-recommendation/', {
        params: { session_id: sessionId },
      })
      .then((response) => {
        setFinalRecommendations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching final recommendation:', error);
      });
  };

  const getImageUrl = (item) => {
    if (item.image) {
      return `http://127.0.0.1:8000${item.image}`;
    } else if (item.image_url) {
      return item.image_url;
    } else {
      return ''; // or a placeholder image URL
    }
  };

  if (finalRecommendations.length > 0) {
    return (
      <div style={styles.finalRecommendation}>
        <h2>We recommend these movies for you:</h2>
        <ul style={styles.recommendationList}>
          {finalRecommendations.map((item) => (
            <li key={item.id} style={styles.recommendationItem}>
              <h3>{item.title}</h3>
              {getImageUrl(item) && (
                <img
                  src={getImageUrl(item)}
                  alt={item.title}
                  style={styles.recommendationImage}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!currentItem) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        {getImageUrl(currentItem) && (
          <img
            src={getImageUrl(currentItem)}
            alt={currentItem.title}
            style={styles.image}
          />
        )}
      </div>
      <div style={styles.title}>
        <h2>{currentItem.title}</h2>
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.buttonRed} onClick={() => handleResponse(1)}>
          I don't recommend
        </button>
        <button style={styles.buttonYellow} onClick={() => handleResponse(3)}>
          Don't know
        </button>
        <button style={styles.buttonGreen} onClick={() => handleResponse(5)}>
          I recommend
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: '400px',
    margin: '50px auto',
    textAlign: 'center',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: '300px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    borderRadius: '10px',
  },
  title: {
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonRed: {
    backgroundColor: 'red',
    color: 'white',
    flex: 1,
    margin: '0 5px',
    padding: '15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonYellow: {
    backgroundColor: 'yellow',
    color: 'black',
    flex: 1,
    margin: '0 5px',
    padding: '15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonGreen: {
    backgroundColor: 'green',
    color: 'white',
    flex: 1,
    margin: '0 5px',
    padding: '15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  finalRecommendation: {
    textAlign: 'center',
    marginTop: '50px',
  },
  recommendationList: {
    listStyleType: 'none',
    padding: 0,
  },
  recommendationItem: {
    marginBottom: '20px',
  },
  recommendationImage: {
    maxWidth: '200px',
    borderRadius: '10px',
  },
};

export default RecommendationCard;
