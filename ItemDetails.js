import React, { useState, useEffect } from 'react';
import { getItem } from '../services/itemService';
import Review from './Review';

const ItemDetails = ({ match }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const result = await getItem(match.params.id);
      setItem(result.data);
    };
    fetchItem();
  }, [match.params.id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.imageUrl} alt={item.name} width="200" />
      <p>{item.description}</p>
      <Review itemId={item._id} />
    </div>
  );
};

export default ItemDetails;
