import React, { useState, useEffect } from "react";
import { getMenus, getMenuItems } from "../services/api";
import "../App.css"

const HomePage = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menus on load
  useEffect(() => {
    const fetchMenus = async () => {
      const data = await getMenus();
      setMenus(data);
    };

    fetchMenus();
  }, []);

  // Fetch menu items and description when a menu is clicked
  const handleMenuClick = async (menuId) => {
    setSelectedMenuId(menuId);
    const items = await getMenuItems(menuId);
    setMenuItems(items);
  };

  return (
    <div>
      <h1>Menu</h1>
      <div className="menu-list">
        {menus.map((menu) => (
          <div key={menu._id}>
            <h2 onClick={() => handleMenuClick(menu._id)}>{menu.name}</h2>
            {selectedMenuId === menu._id && (
              <div>
                <p><strong>Description:</strong> {menu.description}</p> {/* Display Menu Description */}
                {menuItems.length > 0 ? (
                  <ul>
                    {menuItems.map((item) => (
                      <li key={item._id}>
                        <strong>{item.name}</strong>: {item.description} - ${item.price}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No items available for this menu.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

