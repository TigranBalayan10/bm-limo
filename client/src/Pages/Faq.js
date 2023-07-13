import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import FaqText from "../Assets/Data/FaqText.json";

const Faq = () => {
  const [openAccordions, setOpenAccordions] = useState(Array(8).fill(false));

  const handleOpen = (index) => {
    setOpenAccordions((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <Fragment>
      <div className="flex justify-center items-center m-6">
      <div className="bg-slate-900 p-9 max-w-[60rem] mt-6 rounded-lg">
        {FaqText.map((item, index) => (
          <Accordion open={openAccordions[index]} key={index}>
            <AccordionHeader
              onClick={() => handleOpen(index)}
              className="text-yellow-500 hover:text-yellow-800 text-2xl font-bold"
            >
              {item.title}
            </AccordionHeader>
            <AccordionBody className="text-gray-400 text-lg leading-loose">
              {item.body}
            </AccordionBody>
          </Accordion>
        ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Faq;
