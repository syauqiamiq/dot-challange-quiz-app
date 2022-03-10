import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import QuestionPage from "../pages/QuestionPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quiz" element={<QuestionPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
