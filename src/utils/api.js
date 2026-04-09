const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const token = localStorage.getItem("jwt");

export const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const deleteItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const addCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const deleteCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
