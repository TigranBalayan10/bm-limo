import React from "react";
import { Link } from "react-router-dom";
import Quote from "./Quote";

const Home = () => {
  return (
    <main>
      <section>
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="mx-auto max-w-lg">
            <h1 className="text-3xl font-bold text-yellow-600 lg:text-4xl">
              BEVERLY MOTORS
            </h1>
            <p className="mt-6 text-xl text-yellow-500">
              Welcome to our page. Our business is locally operating in Los
              Angeles and surounding areas over 10 years. We pride ourselves on
              providing an exceptional and indulgent transportation experience
              tailored to meet your needs. Whether you require a lavish ride for
              a special occasion, business travel, or simply want to treat
              yourself, our fleet of luxury vehicles and professional chauffeurs
              are at your service.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <img
              className="h-96 w-full rounded-xl object-cover lg:w-4/5"
              src={require("../Media/Landing1.jpg")}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
