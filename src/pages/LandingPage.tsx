import ShipsTypes from "../containers/landing page/ShipsTypes";
import Ships from "../containers/landing page/Ships";
import { useState, useEffect } from "react";
import axios from "axios";
import listing_options_array from "../assets/files/ListingOptionArray";


const LandingPage = () => {
  const [selectedType, setSelectedType] = useState();
  const [shipsTypesArray, setShipsTypesArray] = useState([]);
  const [listingOption, setListingOption] = useState(listing_options_array[0].id);


  
// console.log(isCongratsOpen);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL_CATEGORY}/categories`)
      .then((response) => {
        setShipsTypesArray(response.data);
      })
      // .catch((error) => {
      //   console.log(error);
      // });
  }, []);

  return (
    <div
      className={`content w-full mt-[80px] px-[20px] pb-10 flex flex-col md:px-[80px] md:mt-[90px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px]`}
    >
      <ShipsTypes
        shipsTypes={shipsTypesArray}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        listingOption={listingOption}
        setListingOption={setListingOption}
      />
      <Ships selectedType={selectedType} listingOption={listingOption} />
    </div>
  );
};

export default LandingPage;
