import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import Navigation from "./Pages/Navigation";
import Home from "./Pages/Home";
import Fleet from "./Pages/Fleet";
import Sedancard from "./Components/Sedancard";
import Suvcard from "./Components/Suvcard";
import Smallsedan from "./Components/Smallsedan";
import BookingInfo from "./Pages/BookingInfo";
import Confirmation from "./Components/Confirmation";
import About from "./Pages/About";
import Footer from "./Pages/Footer";
import Contact from "./Pages/Contact";
import ContactSuccess from "./Pages/ContactSuccess";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex flex-col h-screen">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/fleet-sedan" element={<Sedancard />} />
              <Route path="/fleet-suv" element={<Suvcard />} />
              <Route path="/fleet-small-sedan" element={<Smallsedan />} />
              <Route path="/booking-info" element={<BookingInfo />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/confirmation/:orderId/:priceId"
                element={<Confirmation />}
              />
              <Route
                path="/contact-success/:contactId"
                element={<ContactSuccess />}
              />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
