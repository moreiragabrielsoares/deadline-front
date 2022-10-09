import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SingUpPage from "./pages/SingUpPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SingUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
