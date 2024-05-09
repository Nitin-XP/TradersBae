import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RightPanel from "./components/common/RightPanel.jsx";
import Sidebar from "./components/common/SideBar.jsx";
const LazyHome = lazy(() => import('./pages/home/Home.jsx'));
const LazyAbout = lazy(() => import('./pages/About.jsx'));
const LazySettings = lazy(() => import('./pages/Settings.jsx'));
const LazyUsers = lazy(() => import('./pages/Users.jsx'));
const LazyContact = lazy(() => import('./pages/Contact.jsx'));
const LazyLogin = lazy(() => import('./pages/auth/Login.jsx'));
const LazySignUp = lazy(() => import('./pages/auth/SignUp.jsx'));
const LazyNotification = lazy(() => import('./pages/notification/NotificationPage.jsx'));
const LazyProfilePage = lazy(() => import('./pages/profile/ProfilePage.jsx'));

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="flex max-w-6xl mx-auto">
          <Sidebar />
          <Routes>
            <Route path="/" element={<React.Suspense fallback="Loading....."><LazyHome /></React.Suspense>} />
            <Route path="/login" element={<React.Suspense fallback="Loading....."><LazyLogin /></React.Suspense>} />
            <Route path="/signup" element={<React.Suspense fallback="Loading....."><LazySignUp /></React.Suspense>} />
            <Route path="home" element={<React.Suspense fallback="Loading....."><LazyHome /></React.Suspense>} />
            {/* <Route path="about" element={<React.Suspense fallback="Loading....."><LazyAbout /></React.Suspense>} />
            <Route path="settings" element={<React.Suspense fallback="Loading....."><LazySettings /></React.Suspense>} />
            <Route path="contact" element={<React.Suspense fallback="Loading....."><LazyContact /></React.Suspense>} />
            <Route path="users" element={<React.Suspense fallback="Loading....."><LazyUsers /></React.Suspense>} /> */}
            <Route path="/notifications" element={<React.Suspense fallback="Loading....."><LazyNotification /></React.Suspense>} />
            <Route path="/profile/:id" element={<React.Suspense fallback="Loading....."><LazyProfilePage /></React.Suspense>} />
            <Route path="*" element={<>Not Found</>} />
          </Routes>
          <RightPanel />
        </div>

      </BrowserRouter>
    </>
  )
}

export default App
