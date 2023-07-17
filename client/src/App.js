import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Navigation from "./Pages/Navigation";
import Home from "./Pages/Home";
import Fleet from "./Pages/Fleet";
import Sedancard from "./Components/Sedancard";
import Suvcard from "./Components/Suvcard";
import Smallsedan from "./Components/Smallsedan";
import BookingTabs from "./Pages/BookingTabs";
import Confirmation from "./Components/Confirmation";
import About from "./Pages/About";
import Footer from "./Pages/Footer";
import Contact from "./Pages/Contact";
import ContactSuccess from "./Pages/ContactSuccess";
import PaymentCompletion from "./Pages/PaymentCompletion";
import Payment from "./Pages/Payment";
import PaymentCancel from "./Pages/PaymentCancel";
import AdminDashboard from "./Pages/AdminDashboard";
import Login from "./Pages/Login";
import Faq from "./Pages/Faq";
import Terms from "./Pages/Terms";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const token = localStorage.getItem("id_token");

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
              <Route path="/booking-info" element={<BookingTabs />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/terms" element={<Terms />} />
              <Route
                path="/confirmation/:orderId"
                element={<Confirmation />}
              />
              <Route
                path="/contact-success/:contactId"
                element={<ContactSuccess />}
              />
              <Route path="/payment/:orderId" element={<Payment />} />
              <Route path="/payment-success" element={<PaymentCompletion />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
              <Route path={`/admin-dashboard/${token}`} element={<AdminDashboard />} />
              <Route path="/admin-login" element={<Login />} />
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
