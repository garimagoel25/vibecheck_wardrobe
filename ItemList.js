import React, { useState, useEffect } from 'react';
import { getItems } from '../services/itemService';
import Item from './Item';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await getItems();
      setItems(result.data);
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>My Wardrobe</h2>
      <div>
        {items.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
