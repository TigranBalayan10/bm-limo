import React from "react";
import { Button } from "@material-tailwind/react";

export const Modal = ({ isOpen, onClose, modalData }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-90"></div>
      <div className="relative">
        <div className="bg-gradient-to-l from-yellow-900 to-slate-950 p-8 rounded-lg shadow-lg w-96">
            <h1 className="text-2xl text-center mb-4 text-amber-700 italic font-semibold">Order Details</h1>
          {modalData}
          <div className="mt-6 flex justify-center">
            <Button color="amber" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
