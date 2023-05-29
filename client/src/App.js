import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Pages/Navigation";
import Home from "./Pages/Home";
import Fleet from "./Pages/Fleet";
import Quote from "./Pages/Quote";
import Sedancard from "./Components/Sedancard";
import Suvcard from "./Components/Suvcard";
import Smallsedan from "./Components/Smallsedan";

function App() {
  return (
    <Router>
      <div className="flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/fleet-sedan" element={<Sedancard />} />
            <Route path="/fleet-suv" element={<Suvcard />} />
            <Route path="/fleet-small-sedan" element={<Smallsedan />} />
            <Route path="/price" element={<h1>Contact</h1>} />
            <Route path="/quote" element={<Quote />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
