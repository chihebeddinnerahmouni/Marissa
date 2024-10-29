import ShipsTypes from "../containers/ShipsTypes";
import Ships from "../containers/Ships";
import Pagination from "@/components/ui/Pagination";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import axios from "axios";

const LandingPage = () => {

  
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedType, setSelectedType] = useState(ships_types_array[0].name);
  const [selectedType, setSelectedType] = useState();
  const [shipsTypesArray, setShipsTypesArray] = useState([]);

  // const navigate = useNavigate();
  // const location = useLocation();
  // const totalPages = 10;

  // when it mounts
  useEffect(() => { 
    // const query = new URLSearchParams(location.search);
    // const page = query.get("page");
    // if (!page) {
    //   return navigate(`?page=${currentPage}`, { replace: true });
    // }
    // if (Number(page) > totalPages || Number(page) < 1) {
    //   return navigate(`?page=1`, { replace: true });
    // }
    // setCurrentPage(Number(page));

    axios
      .get(`${import.meta.env.VITE_SERVER_URL_CATEGORY}/categories`)
      .then((response) => {
        setShipsTypesArray(response.data);
        setSelectedType(response.data[0].name);
        setSelectedType(response.data[0].id);

      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  // when currentPage changes
  // useEffect(() => { 
  //   navigate(`?page=${currentPage}`, { replace: true });
  // }, [currentPage]);





  



  return (
    <div
      className={`content w-full mt-[80px] px-[20px] pb-10 flex flex-col md:px-[80px] md:mt-[90px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px]`}
    >
      <ShipsTypes
        shipsTypes={shipsTypesArray}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <Ships selectedType={selectedType} currentPage={currentPage} />
      {/* <div className="pagination w-full mt-10">
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        <Pagination itemsPerPage={4} />
      </div> */}
    </div>
  );
};

export default LandingPage;