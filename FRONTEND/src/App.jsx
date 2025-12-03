import React from "react";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
import { Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar.jsx";

const App = () => {
  return (
    <div data-theme="forest" className="min-h-screen relative">

      {/* Content layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/note/:id" element={<NoteDetailPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
