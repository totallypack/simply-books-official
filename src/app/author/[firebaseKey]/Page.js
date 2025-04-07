'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { viewAuthorDetails } from '@/api/mergedData';
import PropTypes from 'prop-types';
import BookCard from '@/components/BookCard';
import { getAuthorBooks } from '@/api/authorData';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});
  const [books, setBooks] = useState([]);

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data

  // TODO: create a function that makes the API call to get all the books
  const getAllTheBooks = () => {
    getAuthorBooks(firebaseKey).then(setBooks);
  };

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
    getAuthorBooks(firebaseKey);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt={authorDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.title} by {authorDetails.authorObject?.first_name} {authorDetails.authorObject?.last_name}
          {authorDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.authorObject?.email}`}>{authorDetails.authorObject?.email}</a>
        <p>{authorDetails.description || ''}</p>
        <hr />
        <p>{authorDetails.sale ? `🏷️ Sale $${authorDetails.price}` : `$${authorDetails.price}`}</p>
      </div>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {/* TODO: map over books here using BookCard component */}
          {books.map((book) => (
            <BookCard key={book.author_id} bookObj={book} onUpdate={getAllTheBooks} />
          ))}
        </div>
      </div>
    </div>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
