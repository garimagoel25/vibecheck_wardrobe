import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Wardrobe = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/wardrobe').then((response) => {
      setItems(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Wardrobe</h1>
      <Link to="/upload">Upload New Item</Link>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <img src={item.imageUrl} alt="wardrobe" />
            <p>{item.description}</p>
            <Link to={`/review/${item._id}`}>Review</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wardrobe;
