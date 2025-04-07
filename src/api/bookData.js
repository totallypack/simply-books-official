import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = clientCredentials.databaseURL;

const getBooks = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// TODO: DELETE BOOK (yo)
const deleteBook = async (firebaseKey) => {
  const del = await fetch(`${endpoint}/books/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = del.json();
  return response;
};

// TODO: GET SINGLE BOOK
const getSingleBook = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: CREATE BOOK  (yo)
const createBook = async (payload) => {
  const post = await fetch(`${endpoint}/books.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const response = post.json();
  return response;
};

// TODO: UPDATE BOOK  (yo)
const updateBook = async (payload) => {
  const patch = await fetch(`${endpoint}/books/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const response = patch.json();
  return response;
};

const getBooksByAuthor = async (firebaseKey) => {
  const author = await fetch(`${endpoint}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = author.json();
  return response;
};

const booksOnSale = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const onSale = Object.values(data).filter((item) => item.sale);
        resolve(onSale);
      })
      .catch(reject);
  });

export { getBooks, createBook, booksOnSale, deleteBook, getSingleBook, updateBook, getBooksByAuthor };
