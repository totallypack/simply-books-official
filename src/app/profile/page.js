'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { clientCredentials } from '@/utils/client';
import UpdateUserData from '@/components/User';
import Loading from '../../components/Loading';

const endpoint = clientCredentials.databaseURL;

export default function UserComponent() {
  const [userProfile, setUserProfile] = useState({});
  const { user, userLoading } = useAuth();

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${endpoint}/users/${user.uid}.json`);
      const userData = await response.json();

      if (userData) {
        setUserProfile(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (user && !userLoading) {
      UpdateUserData({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      fetchUserData();
    }
  }, [user, userLoading]);

  if (userLoading) {
    return <div>{Loading()}</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <div>
      <div>
        <img src={userProfile.photoURL} alt="Profile" width={100} height={100} className="rounded-full" />
      </div>
      <h1>User Profile</h1>
      <div>Name: {userProfile.name}</div>
      <div>Email: {userProfile.email}</div>
      <div>Last Login: {userProfile.lastLogin && new Date(userProfile.lastLogin).toLocaleString()}</div>
    </div>
  );
}
