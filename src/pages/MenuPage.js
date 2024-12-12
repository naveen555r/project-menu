
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMenuItems } from '../services/api';
import MenuItemCard from '../components/MenuItemCard';

const MenuPage = () => {
  const { menuId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await getMenuItems(menuId);
      setItems(data);
    };

    fetchMenuItems();
  }, [menuId]);

  return (
    <div>
      <h1>Menu Items</h1>
      <div className="menu-item-list">
        {items.map(item => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
