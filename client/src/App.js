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
        <div className="flex flex-col">
            <Navigation />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fleet" element={<Fleet />} />
                <Route path="/fleet-sedan" element={<Sedancard />} />
                <Route path="/fleet-suv" element={<Suvcard />} />
                <Route path="/fleet-small-sedan" element={<Smallsedan />} />
                <Route path="/booking-info" element={<BookingInfo />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
