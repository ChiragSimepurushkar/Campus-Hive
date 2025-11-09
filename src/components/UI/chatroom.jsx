import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Send, Paperclip, Smile, MoreVertical, Phone, Video,
  Image, File, Check, CheckCheck, Search, ArrowLeft,
  Download, X, Mic, MicOff
} from "lucide-react";
import { MyContext } from "../../App";


const ChatRoom = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const context = useContext(MyContext);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const wsRef = useRef(null);
  const currentUserId = context?.userData?._id || "user123";

  // Initialize WebSocket connection
  useEffect(() => {
    connectWebSocket();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [projectId]);

  const connectWebSocket = () => {
    try {
      // Replace with your WebSocket server URL
      const ws = new WebSocket(`ws://localhost:5000/chat/${projectId}`);
      
      ws.onopen = () => {
        console.log('WebSocket Connected');
        setIsConnected(true);
        // Send join message
        ws.send(JSON.stringify({
          type: 'join',
          userId: currentUserId,
          userName: context?.userData?.name || 'User'
        }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('WebSocket Disconnected');
        setIsConnected(false);
        // Attempt to reconnect after 3 seconds
        setTimeout(connectWebSocket, 3000);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
    }
  };

  const handleWebSocketMessage = (data) => {
    switch (data.type) {
      case 'message':
        addMessage(data);
        break;
      case 'typing':
        handleTypingIndicator(data);
        break;
      case 'online_users':
        setOnlineUsers(data.users);
        break;
      case 'message_read':
        markMessagesAsRead(data.messageIds);
        break;
      case 'history':
        setMessages(data.messages);
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  };

  const addMessage = (messageData) => {
    const newMessage = {
      id: messageData.id || Date.now(),
      sender: {
        id: messageData.senderId,
        name: messageData.senderName,
        avatar: messageData.senderAvatar || getInitials(messageData.senderName)
      },
      content: messageData.content,
      timestamp: new Date(messageData.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      isOwn: messageData.senderId === currentUserId,
      read: messageData.read || false,
      attachment: messageData.attachment
    };
    
    setMessages(prev => [...prev, newMessage]);
    scrollToBottom();
  };

  const handleTypingIndicator = (data) => {
    if (data.userId !== currentUserId) {
      setIsTyping(data.isTyping);
      if (data.isTyping) {
        setTimeout(() => setIsTyping(false), 3000);
      }
    }
  };

  const markMessagesAsRead = (messageIds) => {
    setMessages(prev =>
      prev.map(msg =>
        messageIds.includes(msg.id) ? { ...msg, read: true } : msg
      )
    );
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map(n => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (inputMessage.trim() === "" || !isConnected) return;

    const messageData = {
      type: 'message',
      content: inputMessage,
      senderId: currentUserId,
      senderName: context?.userData?.name || 'User',
      senderAvatar: getInitials(context?.userData?.name),
      projectId: projectId,
      timestamp: new Date().toISOString()
    };

    wsRef.current?.send(JSON.stringify(messageData));
    setInputMessage("");
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    
    // Send typing indicator
    if (wsRef.current && isConnected) {
      wsRef.current.send(JSON.stringify({
        type: 'typing',
        userId: currentUserId,
        isTyping: e.target.value.length > 0
      }));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload
      const reader = new FileReader();
      reader.onload = (event) => {
        const messageData = {
          type: 'message',
          content: `Sent a file: ${file.name}`,
          senderId: currentUserId,
          senderName: context?.userData?.name || 'User',
          projectId: projectId,
          timestamp: new Date().toISOString(),
          attachment: {
            name: file.name,
            type: file.type,
            size: file.size,
            url: event.target.result // In production, upload to server first
          }
        };
        wsRef.current?.send(JSON.stringify(messageData));
      };
      reader.readAsDataURL(file);
    }
    setShowAttachMenu(false);
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic here
    if (!isRecording) {
      context.openAlertBox('info', 'Voice recording started');
    } else {
      context.openAlertBox('info', 'Voice recording stopped');
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const attachmentOptions = [
    { icon: Image, label: "Photo", color: "text-pink-600", accept: "image/*" },
    { icon: File, label: "Document", color: "text-blue-600", accept: ".pdf,.doc,.docx" },
    { icon: Video, label: "Video", color: "text-purple-600", accept: "video/*" }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-white rounded-2xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white/30 transition-all"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="relative ml-4">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center font-bold border-2 border-white/30">
              🚀
            </div>
            <div
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-indigo-600 ${
                isConnected ? "bg-green-400" : "bg-red-400"
              } ${isConnected ? 'animate-pulse' : ''}`}
            />
          </div>
          
          <div>
            <h3 className="font-bold">Project Team Chat</h3>
            <p className="text-xs text-indigo-100">
              {isConnected ? `${onlineUsers.length} members online` : "Connecting..."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
            <Search size={20} />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
            <Phone size={20} />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
            <Video size={20} />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Connection Status Banner */}
      {!isConnected && (
        <div className="px-4 py-2 bg-yellow-50 border-b border-yellow-200 flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          <span className="text-sm text-yellow-700 font-medium">
            Reconnecting to chat...
          </span>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs font-semibold text-gray-500 px-3 py-1 bg-white rounded-full border border-gray-200">
            Today
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`flex gap-3 max-w-[70%] ${
                msg.isOwn ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {!msg.isOwn && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {msg.sender.avatar}
                </div>
              )}

              <div>
                {!msg.isOwn && (
                  <p className="text-xs font-semibold text-gray-700 mb-1 px-1">
                    {msg.sender.name}
                  </p>
                )}
                
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.isOwn
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm"
                      : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  
                  {msg.attachment && (
                    <div className="mt-2 p-3 bg-white/10 rounded-lg flex items-center gap-2">
                      <File size={16} />
                      <div className="flex-1">
                        <p className="text-xs font-medium">{msg.attachment.name}</p>
                        <p className="text-xs opacity-70">
                          {(msg.attachment.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Download size={16} />
                      </button>
                    </div>
                  )}
                </div>
                
                <div
                  className={`flex items-center gap-1 mt-1 px-1 ${
                    msg.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  {msg.isOwn &&
                    (msg.read ? (
                      <CheckCheck size={14} className="text-blue-500" />
                    ) : (
                      <Check size={14} className="text-gray-400" />
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex gap-3 max-w-[70%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                👤
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-6 py-4 border border-gray-200">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 bg-white border-t-2 border-gray-100">
        <div className="flex items-end gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
            >
              <Paperclip size={20} />
            </button>

            {showAttachMenu && (
              <div className="absolute bottom-full left-0 mb-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[150px]">
                {attachmentOptions.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-all text-left"
                  >
                    <option.icon size={20} className={option.color} />
                    <span className="text-sm font-medium text-gray-700">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={!isConnected}
              className="w-full px-4 py-3 pr-12 bg-gray-100 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-xl outline-none transition-all disabled:opacity-50"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-all"
            >
              <Smile size={20} className="text-gray-600" />
            </button>
          </div>

          <button
            type="button"
            onClick={toggleVoiceRecording}
            className={`p-3 rounded-xl transition-all ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            type="button"
            onClick={sendMessage}
            disabled={!isConnected || inputMessage.trim() === ""}
            className={`p-3 rounded-xl font-semibold transition-all ${
              inputMessage.trim() !== "" && isConnected
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send size={20} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx,video/*"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;