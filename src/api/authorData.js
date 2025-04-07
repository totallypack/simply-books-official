import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAuthors = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// FIXME: CREATE AUTHOR   (yo)
const createAuthor = async (obj) => {
  const create = await fetch(`${endpoint}/authors.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  const response = create.json();
  return response;
};

// FIXME: GET SINGLE AUTHOR  (yo)
const getSingleAuthor = async (firebaseKey) => {
  const obj = await fetch(`${endpoint}/authors/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = obj.json();
  return response;
};

// FIXME: DELETE AUTHOR  (yo)
const deleteSingleAuthor = async (firebaseKey) => {
  const del = await fetch(`${endpoint}/authors/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = del.json();
  return response;
};

// FIXME: UPDATE AUTHOR  (yo)
const updateAuthor = async (payload) => {
  const patch = await fetch(`${endpoint}/authors/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const response = patch.json();
  return response;
};

// TODO: GET A SINGLE AUTHOR'S BOOKS  (yo)
const getAuthorBooks = async (firebaseKey) => {
  const author = await fetch(`${endpoint}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = author.json();
  return response;
};

const favoriteAuthors = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const favorites = Object.values(data).filter((item) => item.favorite);
        resolve(favorites);
      })
      .catch(reject);
  });

export { getAuthors, createAuthor, getSingleAuthor, deleteSingleAuthor, updateAuthor, favoriteAuthors, getAuthorBooks };
