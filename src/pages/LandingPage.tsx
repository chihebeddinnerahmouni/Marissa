import ShipsTypes from "../containers/ShipsTypes";
import Ships from "../containers/Ships";
import shipsArray from "../assets/files/ShipsList";
import Pagination from "@/components/ui/Pagination";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const LandingPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  
   useEffect(() => {
     const query = new URLSearchParams(location.search);
     const page = query.get("page");
     if (page) {
       setCurrentPage(Number(page));
     }
   }, [location.search]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = query.get("page");
    if (page !== String(currentPage)) {
      navigate(`?page=${currentPage}`);
    }
  }, [currentPage, navigate, location.search]);



  return (
    <>
      <div className={`w-full scrollbar-hide`}>
        {/* <ShipsTypes /> to fix the types  */}
        <div
          className={`content w-full mt-[80px] px-[20px] pb-10 flex flex-col md:px-[80px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px]`}
        >
          {/* <div className="content w-full mt-[200px] px-4 pb-5 md:px-20 lg:px-[120px] lg:mt-[100px]"> to fix the types */}
          <ShipsTypes />
          <Ships shipsArray={shipsArray} />
          <div className="pagination w-full mt-10">
            <Pagination currentPage={currentPage} totalPages={10} setCurrentPage={setCurrentPage} />
          </div>

        </div>
      </div>
    </>
  );
};

export default LandingPage;

