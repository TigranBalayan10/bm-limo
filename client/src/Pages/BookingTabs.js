import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import BookingInfo from "./BookingInfo";
import BookingInfoFlat from "./BookingInfoFlat";
import { useLocation } from "react-router-dom";

const BookingTabs = () => {
  const location = useLocation();
  const editInput = location.state?.editData;
  return (
    <div className="flex justify-center items-center mt-6">
      <Tabs
        value={
          editInput && editInput.price && editInput.price.flatRate
            ? "flat"
            : "ride"
        }

      >
        <TabsHeader className="bg-gradient-to-r from-slate-900 to-slate-700">
          <Tab className="text-yellow-500 font-bold" value="ride">
            Ride
          </Tab>
          <Tab className="text-yellow-500 font-bold" value="flat">
            Flat Rate
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="ride">
            <BookingInfo />
          </TabPanel>
          <TabPanel value="flat">
            <BookingInfoFlat />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default BookingTabs;
