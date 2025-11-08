// /client/src/contexts/NotificationContext.jsx

import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx"; 
import useSocket from "../hooks/useSocket.jsx"; // ✅ Corrected path

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isAuthenticated } = useAuth();
  const { socket } = useSocket(); // ✅ useSocket hook

  // Fetch previous notification history (dummy example)
  useEffect(() => {
    if (isAuthenticated) {
      const history = [
        {
          id: 1,
          type: "project_invite",
          data: { title: "Capstone" },
          read: false,
          created_at: new Date(),
        },
      ];
      setNotifications(history);
      setUnreadCount(history.filter((n) => !n.read).length);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated]);

  // Real-time listener
  useEffect(() => {
    if (socket) {
      const handleNewNotification = (newNotification) => {
        setNotifications((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      };

      socket.on("notification", handleNewNotification);

      return () => {
        socket.off("notification", handleNewNotification);
      };
    }
  }, [socket]);

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
