import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuestionPage from "../pages/QuestionPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
