import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
const LazyHome = lazy(() => import('./pages/Home.jsx'));
const LazyAbout = lazy(() => import('./pages/About.jsx'));
const LazySettings = lazy(() => import('./pages/Settings.jsx'));
const LazyUsers = lazy(() => import('./pages/Users.jsx'));
const LazyContact = lazy(() => import('./pages/Contact.jsx'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<React.Suspense fallback="Loading....."><LazyHome /></React.Suspense>} />
          <Route path="home" element={<React.Suspense fallback="Loading....."><LazyHome /></React.Suspense>} />
          <Route path="about" element={<React.Suspense fallback="Loading....."><LazyAbout /></React.Suspense>} />
          <Route path="settings" element={<React.Suspense fallback="Loading....."><LazySettings /></React.Suspense>} />
          <Route path="contact" element={<React.Suspense fallback="Loading....."><LazyContact /></React.Suspense>} />
          <Route path="users" element={<React.Suspense fallback="Loading....."><LazyUsers /></React.Suspense>} />
          <Route path="*" element={<>Not Found</>} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
