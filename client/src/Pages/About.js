import React, { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import AboutText from "../Assets/Data/AboutText.json";

const About = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (index) => {
    setOpen(index === open ? 0 : index);
  };

  return (
    <Fragment>
      <div className="flex justify-center items-center m-6">
        <div className="bg-slate-900 p-9 max-w-[45rem] mt-6 rounded-lg">
          {AboutText.map((item, index) => (
            <Accordion open={open === index + 1} key={index}>
              <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className="text-yellow-500 hover:text-yellow-800 text-2xl font-bold"
              >
                {item.title}
              </AccordionHeader>
              <AccordionBody className="text-gray-400 text-lg leading-loose">
                {typeof item.description === "string" ? (
                  <p>{item.description}</p>
                ) : (
                  <ul className="list-disc list-inside">
                    {item.description.map((description, i) => (
                      <li key={i}>{description}</li>
                    ))}
                  </ul>
                )}
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default About;
