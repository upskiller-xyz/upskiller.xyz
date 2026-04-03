// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import PrivacyPage from "./components/pages/PrivacyPage";
import TermsPage from "./components/pages/TermsPage";
import AboutPage from "./components/pages/AboutPage";
import ResearchPage from "./components/pages/ResearchPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/research" element={<ResearchPage />} />
      </Routes>
    </Router>
  );
}
