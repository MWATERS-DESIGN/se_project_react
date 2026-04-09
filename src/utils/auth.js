const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const signup = ({ email, password, name, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(handleServerResponse);
};

export const signin = ({ email, password }) => {
  console.log("Sending login data:", { email, password });
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

// Added: updateProfile for PATCH /users/me
export const updateProfile = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
};
