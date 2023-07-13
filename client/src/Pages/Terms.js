import React from "react";
import TermsText from "../Assets/Data/TermsText.json";

const Terms = () => {
  return (
    <div className="flex justify-center items-center m-6">
      <div className="bg-slate-900 p-9 max-w-[60rem] mt-6 rounded-lg">
        <h1 className="text-yellow-500 text-2xl font-bold">
          Terms of Service - Beverly Motors LLC
        </h1>
        <p className="text-gray-400 text-md leading-loose">
          Please note that the following terms and conditions govern the
          transportation services provided by our limo company. By booking our
          services, you agree to adhere to these terms:
        </p>
        {TermsText.map((item, index) => (
          <div className="text-gray-400 text-md leading-loose mt-6" key={index}>
            <h1 className="text-yellow-500 text-2xl font-bold">{item.title}</h1>
            <ul className="list-disc list-inside">
              {item.description.map((description, i) => (
                <li key={i}>{description}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Terms;
