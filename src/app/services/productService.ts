import axios from "axios";

const API_URL = "http://localhost:1337/api/products";
const CATEGORY_URL = "http://localhost:1337/api/categories";

// Get all products
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}?populate=*`);
  return response.data.data;
};

// Get categories
export const getCategories = async () => {
  const response = await axios.get(CATEGORY_URL);
  return response.data.data;
};

// Create a product
export const createProduct = async (data: FormData) => {
  await axios.post(API_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Delete a product
export const deleteProduct = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
