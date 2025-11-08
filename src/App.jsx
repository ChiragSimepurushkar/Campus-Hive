import React, { useContext } from 'react';
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
/**
 * Layout wrapper with Navbar for authenticated pages
 */

function App() {
  return (
      <UserProvider>
        <NotificationProvider>
          <AppProvider>
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
          </AppProvider>
        </NotificationProvider>
      </UserProvider>
  );
}

export default App;