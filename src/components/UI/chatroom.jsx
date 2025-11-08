import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Image, File, Check, CheckCheck, Search, X } from 'lucide-react';

const ChatRoom = ({ projectId = '1' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: { id: 1, name: 'Sarah Johnson', avatar: 'SJ' },
      content: 'Hey team! Just pushed the latest updates to the repo. Can someone review the authentication module?',
      timestamp: '10:30 AM',
      isOwn: false,
      read: true
    },
    {
      id: 2,
      sender: { id: 2, name: 'You', avatar: 'JD' },
      content: 'Sure, I can take a look at it right now. Give me 10 minutes.',
      timestamp: '10:32 AM',
      isOwn: true,
      read: true
    },
    {
      id: 3,
      sender: { id: 3, name: 'Mike Chen', avatar: 'MC' },
      content: 'I\'ve reviewed the code. Looks good! Just a few minor suggestions in the PR comments.',
      timestamp: '10:45 AM',
      isOwn: false,
      read: true
    },
    {
      id: 4,
      sender: { id: 1, name: 'Sarah Johnson', avatar: 'SJ' },
      content: 'Perfect! I\'ll address those changes. Also, are we still meeting at 2 PM for the design review?',
      timestamp: '10:50 AM',
      isOwn: false,
      read: true
    },
    {
      id: 5,
      sender: { id: 2, name: 'You', avatar: 'JD' },
      content: 'Yes, definitely. I\'ll have the mockups ready by then.',
      timestamp: '10:52 AM',
      isOwn: true,
      read: false
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: { id: 2, name: 'You', avatar: 'JD' },
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      read: false
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMessage = {
        id: messages.length + 2,
        sender: { id: 1, name: 'Sarah Johnson', avatar: 'SJ' },
        content: 'Got it! Thanks for the update.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false,
        read: false
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const attachmentOptions = [
    { icon: Image, label: 'Photo', color: 'text-pink-600' },
    { icon: File, label: 'Document', color: 'text-blue-600' },
    { icon: Video, label: 'Video', color: 'text-purple-600' }
  ];

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center font-bold border-2 border-white/30">
              🚀
            </div>
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-indigo-600 ${
              isConnected ? 'bg-green-400' : 'bg-gray-400'
            }`}></div>
          </div>
          <div>
            <h3 className="font-bold">Project Team Chat</h3>
            <p className="text-xs text-indigo-100">
              {isConnected ? '3 members online' : 'Connecting...'}
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

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
        {/* Date Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs font-semibold text-gray-500 px-3 py-1 bg-white rounded-full border border-gray-200">
            Today
          </span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className={`flex gap-3 max-w-[70%] ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              {!msg.isOwn && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {msg.sender.avatar}
                </div>
              )}

              {/* Message Bubble */}
              <div>
                {!msg.isOwn && (
                  <p className="text-xs font-semibold text-gray-700 mb-1 px-1">{msg.sender.name}</p>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.isOwn
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                <div className={`flex items-center gap-1 mt-1 px-1 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  {msg.isOwn && (
                    msg.read ? (
                      <CheckCheck size={14} className="text-blue-500" />
                    ) : (
                      <Check size={14} className="text-gray-400" />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex gap-3 max-w-[70%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                SJ
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-6 py-4 border border-gray-200">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
          {/* Attachment Menu */}
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
                    onClick={() => {
                      handleFileSelect();
                      setShowAttachMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-all text-left"
                  >
                    <option.icon size={20} className={option.color} />
                    <span className="text-sm font-medium text-gray-700">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={!isConnected}
              className="w-full px-4 py-3 pr-12 bg-gray-100 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-xl outline-none transition-all"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-all"
            >
              <Smile size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={sendMessage}
            disabled={!isConnected || inputMessage.trim() === ''}
            className={`p-3 rounded-xl font-semibold transition-all ${
              inputMessage.trim() !== '' && isConnected
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              console.log('File selected:', e.target.files[0]);
            }}
          />
        </div>

        {!isConnected && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-yellow-700 font-medium">Reconnecting to chat...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;