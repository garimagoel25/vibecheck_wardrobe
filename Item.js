import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <img src={item.imageUrl} alt={item.name} width="100" />
      <p>{item.description}</p>
      <Link to={`/items/${item._id}`}>View Details</Link>
    </div>
  );
};

export default Item;
