import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { PortfolioProvider } from "@/context/PortfolioContext";
import Portfolio from "@/pages/Portfolio";
import Admin from "@/pages/Admin";

function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
