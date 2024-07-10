import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { lazy } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadSpinner.jsx";
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

axios.defaults.withCredentials = true

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/auth/me"); // causing problem
        const data = res.data;
        if (data.error) return null;
        if (res.status !== 200) throw new Error(data.error || "Something Went Wrong!!");
        return data;
      } catch (error) {
        useNavigate('/login')
        console.log(`I am running in Appjsx`)
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="xl" />
      </div>
    )
  }
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="flex max-w-6xl mx-auto bg-slate-100">
          {authUser && <Sidebar />}
          <Routes>
            <Route path='/' element={<React.Suspense >{authUser ? <LazyHome /> : <Navigate to='/login' />}</React.Suspense>} />
            <Route path='/login' element={<React.Suspense >{!authUser ? <LazyLogin /> : <Navigate to='/' />}</React.Suspense>} />
            <Route path='/signup' element={<React.Suspense >{!authUser ? <LazySignUp /> : <Navigate to='/' />}</React.Suspense>} />

            <Route path="/notifications" element={<React.Suspense >{!authUser ? <Navigate to="/login" /> : <LazyNotification />}</React.Suspense>} />
            <Route path="/profile/:username" element={<React.Suspense >{!authUser ? <Navigate to="/login" /> : <LazyProfilePage />}</React.Suspense>} />
            <Route path="*" element={<>Not Found</>} />
          </Routes>
          {authUser && <RightPanel />}
          {/* <RightPanel /> */}
          <Toaster />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
