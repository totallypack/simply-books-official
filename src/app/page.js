/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getBooks } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import BookCard from '../components/BookCard';
import AuthorCard from '../components/AuthorCard';
import { getAuthors } from '../api/authorData';

function Home() {
  // TODO: Set a state for books
  const [books, setBooks] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheBooks = () => {
    getBooks(user.uid).then(setBooks);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheBooks();
  }, []);

  const [authors, setAuthors] = useState([]);

  // TODO: create a function that makes the API call to get all the books
  const getAllTheAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheAuthors();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/book/new" passHref>
          <Button>Add A Book</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {/* TODO: map over books here using BookCard component */}
          {books.map((book) => (
            <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} />
          ))}
        </div>
      </div>
      <div className="text-center my-4">
        <Link href="/author/new" passHref>
          <Button>Add An Author</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {/* TODO: map over authors here using AuthorCard component */}
          {authors.map((author) => (
            <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllTheAuthors} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
