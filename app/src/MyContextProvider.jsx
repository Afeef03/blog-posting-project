import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

const MyContextProvider = ({ children }) => {
  // Load user and userId from localStorage on component mount
  const [user, setUser] = useState(() => localStorage.getItem('user') || 'User-Name-Here');
  const [userId, setUserId] = useState(() => localStorage.getItem('id') || 0);

  // Update localStorage whenever user or userId changes
  useEffect(() => {
    localStorage.setItem('user', user);
  }, [user]);

  useEffect(() => {
    localStorage.setItem('id', userId.toString());
  }, [userId]);

  return (
    <div>
      <MyContext.Provider value={{ user, setUser, userId, setUserId }}>
        {children}
      </MyContext.Provider>
    </div>
  );
}

export default MyContextProvider;
