import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMenuItem, getMenus } from '../services/api'; // Assuming getMenus fetches all menus

const AddMenuItemPage = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [existingMenus, setExistingMenus] = useState([]); // To store the list of existing menus
  const [selectedMenu, setSelectedMenu] = useState(''); // Store the selected menu ID as a string
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all menus when the component loads
    const fetchMenus = async () => {
      try {
        const menus = await getMenus();  // Fetch the list of menus
        console.log('Fetched menus:', menus);  // Log to check the structure
        setExistingMenus(menus); // Assuming menus are returned as [{id, name}]
      } catch (error) {
        console.error('Failed to fetch menus:', error);
      }
    };

    fetchMenus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If no menu is selected, show an error message
    if (!selectedMenu) {
      setErrorMessage('Please select a menu.');
      return;
    }

    // If menu exists, proceed with adding the item
    const newItem = {
      name: itemName,
      description: itemDescription,
      price: parseFloat(itemPrice),
    };

    try {
      await addMenuItem(selectedMenu, newItem); // Add item to the selected menu
      setItemName('');
      setItemDescription('');
      setItemPrice('');
      setErrorMessage('');
      navigate(`/menu/${selectedMenu}`); // Redirect to the menu page after adding the item
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  return (
    <div>
      <h1>Add Item to Menu</h1>

      {/* Menu Dropdown: Select menu from existing list */}
      <form onSubmit={handleSubmit}>
        <label>
          Select Menu:
          <select
            value={selectedMenu} // Use selectedMenu state here
            onChange={(e) => {
              setSelectedMenu(e.target.value); // Set the selected menu ID directly
            }}
            required
          >
            <option value="" disabled>Select a menu</option>
            {existingMenus.length > 0 ? (
              existingMenus.map((menu) => (
                <option key={menu._id} value={menu._id}>
                  {menu.name}
                </option>
              ))
            ) : (
              <option disabled>No menus available</option> // Handle case when no menus are available
            )}
          </select>
        </label>
        <br />

        {/* Item Fields */}
        <label>
          Item Name:
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </label>
        <br />
        <button type="submit">Add Item</button>

        {/* Display error message if menu is not selected */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddMenuItemPage;
