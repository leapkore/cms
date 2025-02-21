import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';

function AppContent() {
  const location = useLocation();
  const hideHeaderRoutes = ['/signin', '/signup'];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
