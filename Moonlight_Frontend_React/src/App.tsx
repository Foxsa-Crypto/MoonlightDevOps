// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./styles/global.css";
import { BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { AppRoutesAdmin } from "./routes/AppRoutesAdmin.tsx";
import { AppRoutesCustomer } from "./routes/AppRoutesCustomer.tsx";
import { setNavigate } from "./utils/navigate/navigate.ts";

function AppRoutes() {
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      {AppRoutesCustomer}
      {AppRoutesAdmin}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
