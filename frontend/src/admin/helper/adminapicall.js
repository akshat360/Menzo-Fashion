import { API } from '../../backend';

//Category Calls
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const deleteCategory = (userId, token, categoryId) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateCategory = (userId, token, categoryId, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Product Calls -------------------------------------------------------------------------------------------------
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
