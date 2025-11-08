import React, { useState } from 'react';
import { Bell, X, Check, CheckCheck, User, Briefcase, Calendar, MessageCircle, Heart, UserPlus, Settings } from 'lucide-react';

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'project_invite',
      icon: Briefcase,
      color: 'indigo',
      title: 'New project invitation',
      message: 'Sarah Johnson invited you to join "AI Study Assistant"',
      time: '2 hours ago',
      read: false,
      avatar: 'SJ'
    },
    {
      id: 2,
      type: 'like',
      icon: Heart,
      color: 'pink',
      title: 'Someone liked your project',
      message: 'Mike Chen liked your project "Smart Campus App"',
      time: '5 hours ago',
      read: false,
      avatar: 'MC'
    },
    {
      id: 3,
      type: 'event',
      icon: Calendar,
      color: 'purple',
      title: 'New event nearby',
      message: 'AI/ML Hackathon starting in 2 days at MIT',
      time: '1 day ago',
      read: false,
      avatar: null
    },
    {
      id: 4,
      type: 'message',
      icon: MessageCircle,
      color: 'blue',
      title: 'New message',
      message: 'Emma Davis sent you a message about the design review',
      time: '1 day ago',
      read: true,
      avatar: 'ED'
    },
    {
      id: 5,
      type: 'connection',
      icon: UserPlus,
      color: 'green',
      title: 'New connection request',
      message: 'Alex Kumar wants to connect with you',
      time: '2 days ago',
      read: true,
      avatar: 'AK'
    },
    {
      id: 6,
      type: 'project_update',
      icon: Briefcase,
      color: 'orange',
      title: 'Project update',
      message: 'New milestone completed in "Campus Hive Platform"',
      time: '3 days ago',
      read: true,
      avatar: null
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIconColor = (color) => {
    const colors = {
      'indigo': 'bg-indigo-100 text-indigo-600',
      'pink': 'bg-pink-100 text-pink-600',
      'purple': 'bg-purple-100 text-purple-600',
      'blue': 'bg-blue-100 text-blue-600',
      'green': 'bg-green-100 text-green-600',
      'orange': 'bg-orange-100 text-orange-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 hover:bg-gray-100 rounded-xl transition-all group"
      >
        <Bell size={22} className="text-gray-700 group-hover:text-indigo-600 transition-colors" />
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowNotifications(false)}
          ></div>

          {/* Dropdown Panel */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-slide-down">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-white rounded-lg transition-all"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {`unreadCount > 0 ? ${unreadCount} unread : 'All caught up!'`}
                </p>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <CheckCheck size={14} />
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[500px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bell size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">No notifications</p>
                  <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`group relative px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-all cursor-pointer ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {/* Unread Indicator */}
                      {!notification.read && (
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}

                      <div className="flex items-start gap-3">
                        {/* Icon or Avatar */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(notification.color)}`}>
                          {notification.avatar ? (
                            <span className="font-bold text-sm">{notification.avatar}</span>
                          ) : (
                            <Icon size={20} />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-semibold mb-1 ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 leading-snug mb-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded-lg transition-all"
                        >
                          <X size={16} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
                <button className="w-full text-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 py-2 rounded-lg hover:bg-indigo-50 transition-all">
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NotificationBell;