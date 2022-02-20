import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import QuestionPage from "../pages/QuestionPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} /> */}
        <Route path="/" element={<QuestionPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
