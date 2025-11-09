
const NotificationBell = ({ userId }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    // Connect to notification WebSocket
    const ws = new WebSocket(`ws://localhost:5000/notifications/${userId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Notification WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);
        setNotifications(prev => [
          {
            id: Date.now(),
            ...notification,
            time: 'Just now',
            read: false
          },
          ...prev
        ]);
      } catch (error) {
        console.error('Error parsing notification:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('Notification WebSocket error:', error);
    };

    return () => {
      if (ws) ws.close();
    };
  }, [userId]);

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

  const getIcon = (type) => {
    switch(type) {
      case 'project_invite': return Briefcase;
      case 'like': return Heart;
      case 'message': return MessageCircle;
      case 'connection': return UserPlus;
      default: return Bell;
    }
  };

  const getColor = (type) => {
    const colors = {
      'project_invite': 'bg-indigo-100 text-indigo-600',
      'like': 'bg-pink-100 text-pink-600',
      'message': 'bg-blue-100 text-blue-600',
      'connection': 'bg-green-100 text-green-600'
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="relative">
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

      {showNotifications && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                <button onClick={() => setShowNotifications(false)} className="p-1 hover:bg-white rounded-lg transition-all">
                  <X size={18} className="text-gray-600" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                </p>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                    <CheckCheck size={14} />
                    Mark all read
                  </button>
                )}
              </div>
            </div>

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
                  const Icon = getIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`group relative px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-all cursor-pointer ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {!notification.read && (
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getColor(notification.type)}`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-semibold mb-1 ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 leading-snug mb-1">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
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
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;