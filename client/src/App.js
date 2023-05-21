import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Pages/Navigation";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <div className="flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/contact" element={<h1>Contact</h1>} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
