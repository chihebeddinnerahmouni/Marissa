import ShipsTypes from "../containers/landing page/ShipsTypes";
import Ships from "../containers/landing page/Ships";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import listing_options_array from "../assets/files/ListingOptionArray";
import { useQuery } from "@tanstack/react-query";
import LoadingLine from "@/components/ui/LoadingLine";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";


const categoriesUrl = `${import.meta.env.VITE_SERVER_URL_CATEGORY}`;
const shipsUrl = `${import.meta.env.VITE_SERVER_URL_LISTING}`;
  const mainColor = "#FF385C"


const fetshCategories = async () => {
  const { data } = await axios.get(categoriesUrl + "/categories");
  return data;
}

const fetchShips = async (page: string, listingOption: number, categoryId: number | undefined) => {
  const toSend = categoryId
    ? `${shipsUrl}/api/listing/listings?page=${page}&sortBy=${listingOption}&categoryId=${categoryId}`
    : `${shipsUrl}/api/listing/listings?page=${page}&sortBy=${listingOption}`;
  const { data } = await axios.get(
    `${toSend}`
  );
  return data;
}


const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  
  const [selectedType, setSelectedType] = useState();
  const [listingOption, setListingOption] = useState(
    listing_options_array[0]
    );
    const [currentPage, setCurrentPage] = useState(pageParam);
    
    useEffect(() => {
      navigate(`?page=${currentPage}`, {
        replace: true,
      });
    }, [currentPage, navigate]);
  

  
 
    
  // for pagination
    const handlePageChange = useCallback(
      (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
      },
      []);
  
  
  
  const { data: shipsTypesArray, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery({
    queryKey: ["categoriesLanding"],
    queryFn: fetshCategories
  });
  const { data: shipsResult, isLoading: isLoadingShips, isError: isErrorShips } = useQuery({
    queryKey: ["shipsLanding", listingOption, selectedType],
    queryFn: () => fetchShips(currentPage.toString(), listingOption.id, selectedType),
  });


    if (isLoadingCategories || isLoadingShips)
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  if (isErrorShips || isErrorCategories) return <div>Error</div>;


  

  return (
    <div
      className={`content w-full mt-[80px] px-[20px] pb10 flex flex-col md:px-[80px] md:mt-[90px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px]`}
    >
      <ShipsTypes
        shipsTypes={shipsTypesArray}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        listingOption={listingOption}
        setListingOption={setListingOption}
      />
      <Ships
        shipsArray={shipsResult.listings}
      />

      <div className="w-full flex justify-center my-10">
        <Pagination
          count={shipsResult.pagination.totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "gray",
              "&.Mui-selected": {
                backgroundColor: mainColor,
                color: "white",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LandingPage;
