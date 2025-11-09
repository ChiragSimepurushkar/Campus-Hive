import React, { createContext, useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { AuthContext, AuthProvider } from './contexts/AuthContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import { AppProvider } from './contexts/AppContext.jsx';

// Layout Components
import Layout from './components/UI/layout.jsx';
import Navbar from './components/UI/Navbar.jsx';

// Authentication Pages
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import OTPVerification from './pages/OTPverification.jsx';
import ForgotPassword from './pages/Forgetpassword.jsx';
import ChangePassword from './pages/Changepassword.jsx';

// Main Pages
import Home from './pages/Home.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

// Project Pages

import ProjectDetailPage from './pages/ProjectDetailPage.jsx';

// Event Pages



// Other Components
import LoadingSpinner from './components/UI/loadingspinner.jsx';
import ProjectsPage from './pages/Projectpage.jsx';
import EventsPage from './pages/Eventpage.jsx';
import ChatRoom from './components/UI/chatroom.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx'

/**
 * Protected route wrapper to ensure authentication.
 */

import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { fetchDataFromApi } from './utils/api.js';
import SettingsPage from './pages/SettingsPage.jsx';
import ConnectionsPage from './pages/ConnectionsPage.jsx';
import CreateProjectPage from './pages/CreateProjectPage.jsx';
import AddEvent from './pages/AddEvent.jsx';
/**
 * Layout wrapper with Navbar for authenticated pages
 */
const MyContext = createContext();

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [userData, setuserData] = useState(null);

  const apiUrl = 'https://server-campus-hive.vercel.app/' ||  import.meta.env.VITE_API_URL;

  useEffect(() => {

    const token = localStorage.getItem('accesstoken');
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);
      fetchDataFromApi(`/api/user/user-details`)
        .then((res) => {
          setuserData(res.data);
          if (res?.response?.data?.error === true) {
            if (res?.response?.data?.message === "You have not login") {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              openAlertBox("error", "Your Session is Over !! Please Login again")
              window.location.href = "/login"
              setIsLogin(false);
            }
          }
        })
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const openAlertBox = (status, msg) => {
    if (status === 'Success' || status === 'success') {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  }
  const values = {
    openAlertBox,
    isLogin,
    setIsLogin,
    userData, setuserData
  }
  return (
    <>
      <UserProvider>
        <NotificationProvider>
          <AppProvider>
            <MyContext.Provider value={values}>
              <Routes>
                {/* Public Routes - Layout without Navbar */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="verify-otp" element={<OTPVerification />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route path="change-password" element={<ChangePassword />} />
                </Route>

                {/* Protected Routes - With Navbar */}
                <Route
                  path="/dashboard"
                  element={

                    <DashboardPage />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProfilePage />
                  }
                />

                <Route
                  path="/profile/:userId"
                  element={
                    <ProfilePage />
                  }
                />

                {/* Project Routes */}
                <Route
                  path="/projects"
                  element={
                    <ProjectsPage />
                  }
                />
                <Route
                  path="/projects/create"
                  element={
                    <CreateProjectPage />
                  }
                />
                <Route
                  path="/projects/:id"
                  element={
                    <ProjectDetailPage />
                  }
                />

                {/* Event Routes */}
                <Route
                  path="/events"
                  element={
                    <EventsPage />
                  }
                />
                <Route
                  path="/events/create"
                  element={
                    <AddEvent />
                  }
                />
                <Route
                  path="/events/:id"
                  element={
                    <EventDetailPage />
                  }
                />

                {/* Messages/Chat Route */}
                <Route
                  path="/messages"
                  element={
                    <div className="max-w-7xl mx-auto px-4 py-8">
                      <h1 className="text-3xl font-bold mb-6">Messages</h1>
                      <ChatRoom projectId="1" />
                    </div>
                  }
                />

                <Route
                  path="/messages/:projectId"
                  element={
                    <div className="max-w-7xl mx-auto px-4 py-8">
                      <ChatRoom />
                    </div>

                  }
                />
                <Route
                  path="/settings"
                  element={
                    <div className="max-w-7xl mx-auto px-4 py-8">
                      <SettingsPage />
                    </div>

                  }
                />
                <Route
                  path="/connections"
                  element={
                    <div className="max-w-7xl mx-auto px-4 py-8">
                      <ConnectionsPage />
                    </div>

                  }
                />

                {/* 404 Fallback */}
                <Route
                  path="*"
                  element={
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                        <a
                          href="/"
                          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all inline-block"
                        >
                          Go Home
                        </a>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </MyContext.Provider>
          </AppProvider>
        </NotificationProvider>
      </UserProvider>
      <Toaster />
    </>
  );
}

export default App;
export { MyContext };