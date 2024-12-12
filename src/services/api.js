// src/services/api.js
import axios from "axios";

// Base URL of the backend API
const API_BASE_URL = "http://localhost:8000/api"; // Replace with your backend URL

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Functions

// 1. Fetch all menus
export const getMenus = async () => {
  try {
    const response = await apiClient.get("/menus");
    return response.data; // Returns list of menus
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw new Error(error.message);
  }
};

// 2. Fetch a single menu by ID
export const fetchMenuById = async (menuId) => {
  try {
    const response = await apiClient.get(`/menus/${menuId}`);
    return response.data; // Returns menu by ID
  } catch (error) {
    console.error(`Error fetching menu with ID ${menuId}:`, error);
    throw new Error(error.message);
  }
};

// 3. Add a new menu
export const addMenu = async (menuData) => {
  try {
    const response = await apiClient.post("/menus", menuData);
    return response.data; // Returns the newly created menu
  } catch (error) {
    console.error("Error adding new menu:", error);
    throw new Error(error.message);
  }
};

// 4. Add an item to a menu
export const addMenuItem = async (menuId, itemData) => {
  try {
    const response = await apiClient.post(`/menus/${menuId}/items`, itemData);
    return response.data; // Returns the added menu item
  } catch (error) {
    console.error(`Error adding item to menu with ID ${menuId}:`, error);
    throw new Error(error.message);
  }
};

// 5. Fetch all items for a menu
export const getMenuItems = async (menuId) => {
  try {
    const response = await apiClient.get(`/menus/${menuId}/items`);
    return response.data; // Returns list of items for the menu
  } catch (error) {
    console.error(`Error fetching items for menu with ID ${menuId}:`, error);
    throw new Error(error.message);
  }
};

// 6. Delete a menu item
export const deleteMenuItem = async (menuId, itemId) => {
  try {
    const response = await apiClient.delete(`/menus/${menuId}/items/${itemId}`);
    return response.data; // Returns confirmation of deletion
  } catch (error) {
    console.error(`Error deleting item with ID ${itemId} from menu ${menuId}:`, error);
    throw new Error(error.message);
  }
};

// 7. Update a menu item
export const updateMenuItem = async (menuId, itemId, updatedData) => {
  try {
    const response = await apiClient.put(
      `/menus/${menuId}/items/${itemId}`,
      updatedData
    );
    return response.data; // Returns the updated menu item
  } catch (error) {
    console.error(`Error updating item with ID ${itemId} in menu ${menuId}:`, error);
    throw new Error(error.message);
  }
};

export default {
  getMenus,
  fetchMenuById,
  addMenu,
  addMenuItem,
  getMenuItems,
  deleteMenuItem,
  updateMenuItem,
};
