import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SingUpPage from "./pages/SingUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SingUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
