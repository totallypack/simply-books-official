'use client';

/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getAuthors } from '@/api/authorData';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import AuthorCard from '@/components/AuthorCard';

// TODO: create a reusable form to add/edit book and render in this view

export default function AddAuthor() {
  const { user } = useAuth();
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
  );
}
