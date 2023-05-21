import React from "react";

const Fleet = () => {
  return (
    <section>
      <div className="container mx-auto px-6 py-10 text-center">
        <h1 className="text-3xl font-bold text-yellow-600 lg:text-4xl">
          OUR FLEET
        </h1>

        <p className="mt-4 text-center text-yellow-500 text-xl">
          Experience the epitome of comfort, style, and elegance as you step
          into one of our meticulously maintained luxury cars. Our vehicles are
          handpicked to ensure the highest standards of quality and
          sophistication. From sleek sedans to spacious SUVs, we have a wide
          range of options to suit your preferences and group size.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
          <div>
            <img
              className="h-96 w-full rounded-lg object-cover"
              src={require("../Media/BMW.jpg")}
              alt="BMW 7 series"
            />
            <h2 className="mt-4 text-2xl font-semibold capitalize text-yellow-600">
              Luxury sedans
            </h2>
          </div>

          <div>
            <img
              className="h-96 w-full rounded-lg object-cover"
              src={require("../Media/cadillac-escalade.jpg")}
              alt="Cadillac Escalade"
            />
            <h2 className="mt-4 text-2xl font-semibold capitalize text-yellow-600">
              Luxury SUVs
            </h2>
          </div>
          <div>
            <img
              className="h-96 w-full rounded-lg object-cover"
              src={require("../Media/Lexus.jpg")}
              alt="Lexus ES"
            />
            <h2 className="mt-4 text-2xl font-semibold capitalize text-yellow-600">
              Smaller luxury sedans
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
