// AddMenuItem.js
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddMenuItem = ({ selectedMenu, addItemToMenu }) => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const handleAddItem = () => {
    if (!itemName || !itemDescription || !itemPrice) {
      toast.error("All fields are required!");
      return;
    }

    const newItem = {
      name: itemName,
      description: itemDescription,
      price: parseFloat(itemPrice),
    };

    addItemToMenu(selectedMenu, newItem);

    // Clear fields after adding
    setItemName("");
    setItemDescription("");
    setItemPrice("");

    toast.success("Item added successfully!");
  };

  return (
    <div className="add-menu-item">
      <h3>Add Item to {selectedMenu}</h3>

      <div className="form-group">
        <label>Item Name</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name"
        />
      </div>

      <div className="form-group">
        <label>Item Description</label>
        <textarea
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          placeholder="Enter item description"
        ></textarea>
      </div>

      <div className="form-group">
        <label>Item Price</label>
        <input
          type="number"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          placeholder="Enter item price"
        />
      </div>

      <button className="add-item-button" onClick={handleAddItem}>
        Add Item
      </button>
    </div>
  );
};

export default AddMenuItem;
