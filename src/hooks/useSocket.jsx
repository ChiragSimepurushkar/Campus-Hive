// /client/src/hooks/useSocket.jsx

import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client"; // Uncomment when backend is ready

const SOCKET_URL = "http://localhost:5000";

/**
 * Custom React Hook for managing a Socket.io connection.
 * Can be used globally or room-based (per project/user/etc).
 */
const useSocket = (room) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Uncomment this when you integrate the backend:
    // const token = localStorage.getItem("authToken");
    // const socket = io(SOCKET_URL, { query: { token } });

    // Temporary dummy socket (for testing UI without backend)
    const dummySocket = {
      on: (event, callback) => {
        console.log(`[Socket] Listening for: ${event}`);
      },
      emit: (event, data) => {
        console.log(`[Socket] Emitting ${event}:`, data);
      },
      connect: () => setIsConnected(true),
      disconnect: () => setIsConnected(false),
      off: () => {},
    };

    socketRef.current = dummySocket;
    socketRef.current.connect();

    if (room && socketRef.current) {
      socketRef.current.emit("joinRoom", room);
    }

    return () => {
      if (socketRef.current) {
        if (room) {
          socketRef.current.emit("leaveRoom", room);
        }
        socketRef.current.disconnect();
      }
    };
  }, [room]);

  return {
    socket: socketRef.current,
    isConnected,
  };
};

export default useSocket;
