'use client';

import firebase from 'firebase';
import PropTypes from 'prop-types';

function UpdateUserData({ uid, displayName, email, photoURL }) {
  if (!uid) return null;

  const userRef = firebase.database().ref(`users/${uid}`);
  return userRef
    .set({
      uid,
      name: displayName || 'User',
      email,
      photoURL,
      lastLogin: Date.now(),
    })
    .then(() => {
      const emailEncoded = btoa(email);
      const emailMapRef = firebase.database().ref(`emailToUid/${emailEncoded}`);
      return emailMapRef.set(uid);
    })
    .catch((error) => {
      console.error('Error updating user data:', error);
    });
}

UpdateUserData.propTypes = {
  uid: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photoURL: PropTypes.string,
};

export default UpdateUserData;
