import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Ensure this matches your backend URL

// Function to fetch all products (limited columns)
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to fetch full product details (requires authentication)
export const fetchFullProducts = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/products/full`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching full product details:', error);
    throw error;
  }
};

// Function to log in and receive a JWT token
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to register a new user (optional)
export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to create a new product (requires authentication)
export const createProduct = async (product, token) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Function to fetch all series
export const fetchSeries = async () => {
  try {
    const response = await axios.get(`${API_URL}/series`);
    return response.data;
  } catch (error) {
    console.error('Error fetching series:', error);
    throw error;
  }
};

// Function to fetch products by series ID
export const fetchProductsBySeries = async (seriesId, token) => {
  try {
    const response = await axios.get(`${API_URL}/products/series/${seriesId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for series ${seriesId}:`, error);
    throw error;
  }
};
