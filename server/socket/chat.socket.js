// server/socket/chat.socket.js
import { WebSocketServer } from 'ws';

export const setupChatSocket = (server) => {
  const wss = new WebSocketServer({ server, path: '/chat' });
  
  const rooms = new Map(); // roomId -> Set of clients
  
  wss.on('connection', (ws, req) => {
    let currentRoom = null;
    let userId = null;
    
    ws.on('message', (data) => {
      const message = JSON.parse(data);
      
      if (message.type === 'join') {
        currentRoom = message.projectId;
        userId = message.userId;
        
        if (!rooms.has(currentRoom)) {
          rooms.set(currentRoom, new Set());
        }
        rooms.get(currentRoom).add(ws);
        
        // Broadcast online users
        broadcastToRoom(currentRoom, {
          type: 'online_users',
          users: Array.from(rooms.get(currentRoom)).length
        });
      }
      
      if (message.type === 'message') {
        // Save to database here
        broadcastToRoom(currentRoom, message, ws);
      }
      
      if (message.type === 'typing') {
        broadcastToRoom(currentRoom, message, ws);
      }
    });
    
    ws.on('close', () => {
      if (currentRoom && rooms.has(currentRoom)) {
        rooms.get(currentRoom).delete(ws);
      }
    });
  });
  
  function broadcastToRoom(roomId, message, except = null) {
    if (!rooms.has(roomId)) return;
    
    rooms.get(roomId).forEach(client => {
      if (client !== except && client.readyState === 1) {
        client.send(JSON.stringify(message));
      }
    });
  }
};