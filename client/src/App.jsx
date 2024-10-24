import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { lazy } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadSpinner.jsx";
import Sidebar from "./components/common/SideBar.jsx";
import { BASE_URL } from "./Constants/constant.js";
import { Fundamentals } from "./pages/widgets/news/Fundamentals.jsx";
const LazyHome = lazy(() => import('./pages/home/Home.jsx'));
const LazyLanding = lazy(() => import('./pages/Landing.jsx'));

const LazyWidgets = lazy(() => import('./pages/widgets/Widgets.jsx'));
const LazyCalendar = lazy(() => import('./pages/widgets/news/Calendar.jsx'));
const LazyForex = lazy(() => import('./pages/widgets/forexPairs/Forex.jsx'));
const LazyChart = lazy(() => import('./pages/widgets/forexPairs/Charts.jsx'));
const LazyHeatmap = lazy(() => import('./pages/widgets/heatmaps/Heatmap.jsx'));
const LazyScreener = lazy(() => import('./pages/widgets/screeners/Screener.jsx'));

const LazyLogin = lazy(() => import('./pages/auth/Login.jsx'));
const LazySignUp = lazy(() => import('./pages/auth/SignUp.jsx'));
const LazyNotification = lazy(() => import('./pages/notification/NotificationPage.jsx'));
const LazyProfilePage = lazy(() => import('./pages/profile/ProfilePage.jsx'));

axios.defaults.withCredentials = true

function App() {
  console.log(`${BASE_URL}`);
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axios.get(BASE_URL + "/api/auth/me"); // causing problem
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
        {/* max-w-6xl to max-w-full */}
        <div className="flex max-w-full mx-auto bg-slate-50">
          {authUser && <Sidebar />}
          <Routes>
            {/* AuthRoutes */}
            <Route path='/' element={<React.Suspense fallback={<LoadingSpinner />}>{<LazyLanding />}</React.Suspense>} />
            <Route path='/home' element={<React.Suspense >{authUser ? <LazyHome /> : <Navigate to='/login' />}</React.Suspense>} />
            <Route path='/login' element={<React.Suspense >{!authUser ? <LazyLogin /> : <Navigate to='/home' />}</React.Suspense>} />
            <Route path='/signup' element={<React.Suspense >{!authUser ? <LazySignUp /> : <Navigate to='/home' />}</React.Suspense>} />

            {/* SideBar Routes */}
            <Route path="/widgets" element={<React.Suspense ><LazyWidgets /></React.Suspense>} />
            <Route path="/widgets/calendar" element={<React.Suspense ><LazyCalendar /></React.Suspense>} />
            <Route path="/widgets/forex" element={<React.Suspense ><LazyForex /></React.Suspense>} />
            <Route path="/widgets/forex/chart" element={<React.Suspense ><LazyChart /></React.Suspense>} />
            <Route path="/widgets/heatmaps" element={<React.Suspense ><LazyHeatmap /></React.Suspense>} />
            <Route path="/widgets/news" element={<React.Suspense fallback={<LoadingSpinner />} ><Fundamentals /></React.Suspense>} />
            <Route path="/widgets/screeners" element={<React.Suspense ><LazyScreener /></React.Suspense>} />


            <Route path="/notifications" element={<React.Suspense >{!authUser ? <Navigate to="/login" /> : <LazyNotification />}</React.Suspense>} />
            <Route path="/profile/:username" element={<React.Suspense >{!authUser ? <Navigate to="/login" /> : <LazyProfilePage />}</React.Suspense>} />

            {/* Error Route */}
            <Route path="*" element={<center>Not Found</center>} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
