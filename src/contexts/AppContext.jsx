import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New project match: AI Research Team', time: '5m ago', unread: true },
    { id: 2, text: 'John joined your project', time: '1h ago', unread: true },
    { id: 3, text: 'Event reminder: Tech Talk tomorrow', time: '2h ago', unread: false }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, unread: false } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, unread: false })));
  };

  return (
    <AppContext.Provider value={{ notifications, markAsRead, markAllAsRead }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};