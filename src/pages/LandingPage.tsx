import ShipsTypes from "../containers/ShipsTypes";
import Ships from "../containers/Ships";
import { useState, useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
  const [selectedType, setSelectedType] = useState();
  const [shipsTypesArray, setShipsTypesArray] = useState([]);
  const [listingOption, setListingOption] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL_CATEGORY}/categories`)
      .then((response) => {
        // console.log(response.data);
        setShipsTypesArray(response.data);
        setSelectedType(response.data[0].name);
        setSelectedType(response.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      className={`content w-full mt-[80px] px-[20px] pb-10 flex flex-col md:px-[80px] md:mt-[90px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px]`}
    >
      <ShipsTypes
        shipsTypes={shipsTypesArray}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        
      />
      <Ships selectedType={selectedType} />
    </div>
  );
};

export default LandingPage;
