/* eslint-disable max-len */

import { User } from "../controller/types";

export const getUsers = async () => {
  const res = await fetch(`https://642135fb34d6cd4ebd6d74c5.mockapi.io/api/v1/users`, {
    method: 'GET',
    headers: {'content-type': 'application/json'}
  });
  const data = await res.json();

  if (!data) {
    throw new Error('Can not load the data')
  }

  return data;
};

export const postNewUser = async (options: User) => {
  const res = await fetch(`https://642135fb34d6cd4ebd6d74c5.mockapi.io/api/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': ' application/json'
    },
    body: JSON.stringify(options)
  });
  const data = await res.json();

  if (!data) {
    throw new Error('Can not load the data')
  }

  return data;
};

export const putUserData = async (id: number, user: User) => {
  const res = await fetch(`https://642135fb34d6cd4ebd6d74c5.mockapi.io/api/v1/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': ' application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await res.json();

  if (!data) {
    throw new Error('Can not load the data')
  }

  return data;
};

export const deleteUser = async (id: number) => {
  const res = await fetch(`https://642135fb34d6cd4ebd6d74c5.mockapi.io/api/v1/users/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();

  if (!data) {
    throw new Error('Can not load the data')
  }

  return data;
};
