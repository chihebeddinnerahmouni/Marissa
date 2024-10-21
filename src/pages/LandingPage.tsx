import ShipsTypes from "../containers/ShipsTypes";
import Ships from "../containers/Ships";
import shipsArray from "../assets/files/ShipsList";
// import { AppContext } from "../App";
// import { useContext } from "react";


const LandingPage = () => {

  // const { isFormOpen } = useContext(AppContext);


  return (
    <>
      <div
        className={`w-full scrollbar-hide`}
      >
        {/* <ShipsTypes /> to fix the types  */}
        <div
          className={`content w-full mt-[80px] px-[20px] pb-10 flex flex-col md:px-[80px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px]`}
        >
          {/* <div className="content w-full mt-[200px] px-4 pb-5 md:px-20 lg:px-[120px] lg:mt-[100px]"> to fix the types */}
          <ShipsTypes />
          <Ships shipsArray={shipsArray} />
        </div>
      </div>
    </>
  );
};

export default LandingPage;

