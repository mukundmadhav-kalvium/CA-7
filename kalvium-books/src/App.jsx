import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import RegistrationForm from "./components/RegistrationForm";
import Content from "./components/Content";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/SignUp" element={<RegistrationForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
