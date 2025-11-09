import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Bell,
  User,
  Search,
  Home,
  Briefcase,
  Calendar,
  MessageCircle,
  Settings,
  LogOut,
  ChevronDown,
  Users,
  Plus
} from 'lucide-react';
import { fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, type: 'project', text: 'Sarah invited you to AI Study Assistant', time: '2h ago', unread: true },
    { id: 2, type: 'like', text: 'Mike liked your project idea', time: '5h ago', unread: true },
    { id: 3, type: 'event', text: 'New event: Tech Talk tomorrow', time: '1d ago', unread: false },
    { id: 4, type: 'message', text: 'Emma sent you a message', time: '2d ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const navLinks = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Projects', icon: Briefcase, path: '/projects' },
    { name: 'Events', icon: Calendar, path: '/events' },
    { name: 'Messages', icon: MessageCircle, path: '/messages', badge: 3 }
  ];

  const logout = async () => {
    try {
      // if you require credentials: set withCredentials on fetchDataFromApi
      const res = await fetchDataFromApi(`/api/user/logout`, { withCredentials: true });
      // server response shape may vary; handle success path
      if (res?.success === true || res?.message === 'Logout successfully') {
        context.setIsLogin(false);
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('refreshToken');
        context.openAlertBox('success', 'You have been logged out.');
        navigate('/');
      } else {
        // fallback: still clear client state and show message
        context.setIsLogin(false);
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('refreshToken');
        context.openAlertBox('error', res?.message || 'Logout failed.');
      }
    } catch (err) {
      console.error('Logout failed:', err);
      context.openAlertBox('error', 'Logout failed due to a network error.');
    }
  };

  // derive initials for avatar
  const initials = context?.userData?.name
    ? context.userData.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'JD';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + Desktop nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                Campus Hive
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="relative px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all flex items-center gap-2"
                >
                  <link.icon size={20} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Create Button */}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold">Mark all read</button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notif => (
                      <button
                        key={notif.id}
                        className={`w-full p-4 border-b border-gray-50 hover:bg-gray-50 transition-all text-left ${notif.unread ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? 'bg-blue-600' : 'bg-transparent'}`} />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 mb-1">{notif.text}</p>
                            <p className="text-xs text-gray-500">{notif.time}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button className="w-full p-3 text-center text-sm text-indigo-600 hover:bg-indigo-50 font-semibold transition-all">View All Notifications</button>
                </div>
              )}
            </div>

            {/* Authentication / Profile area */}
            <div className="relative">
              {!context?.isLogin ? (
                // Not logged in -> show Login / Register links (styled)
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:border-indigo-300 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                // Logged in -> show avatar + dropdown
                <>
                  <button
                    onClick={() => {
                      setShowUserMenu(!showUserMenu);
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {initials}
                    </div>
                    <ChevronDown size={16} className="text-gray-600" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{context?.userData?.name || 'User'}</div>
                            <div className="text-sm text-gray-600">{context?.userData?.email || ''}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <Link to="/profile" className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                          <User size={18} /> <span className="font-medium">My Profile</span>
                        </Link>
                        <Link to="/profile" className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                          <Briefcase size={18} /> <span className="font-medium">My Projects</span>
                        </Link>
                        <Link to="/connections" className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                          <Users size={18} /> <span className="font-medium">Connections</span>
                        </Link>
                        <Link to="/settings" className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                          <Settings size={18} /> <span className="font-medium">Settings</span>
                        </Link>
                      </div>

                      <div className="p-2 border-t border-gray-100">
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <LogOut size={18} />
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2">
            <div className="space-y-1 pt-2">
              {/* Create Button */}
              <Link to="/create" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold mb-2">
                <Plus size={20} /> <span>Create New</span>
              </Link>

              {/* Auth (mobile) */}
              {!context?.isLogin ? (
                <div className="px-4">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-700 font-medium mb-2">Login</Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold">Register</Link>
                </div>
              ) : (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                    <User size={20} /> <span className="font-medium">My Profile</span>
                  </Link>
                  <button onClick={() => { setMobileMenuOpen(false); logout(); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all">
                    <LogOut size={20} /> <span className="font-medium">Sign Out</span>
                  </button>
                </>
              )}

              {/* Mobile Nav Links */}
              {navLinks.map((link, idx) => (
                <Link key={idx} to={link.path} onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                  <link.icon size={20} />
                  <span className="font-medium">{link.name}</span>
                  {link.badge && <span className="ml-auto w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{link.badge}</span>}
                </Link>
              ))}

              <div className="border-t border-gray-100 my-2"></div>
              <Link to="/connections" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                <Users size={20} /> <span className="font-medium">Connections</span>
              </Link>
              <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                <Settings size={20} /> <span className="font-medium">Settings</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
