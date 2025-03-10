// import ShipsTypes from "../containers/landing page/ShipsTypes";
// import Ships from "../containers/landing page/Ships";
// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import listing_options_array from "../assets/files/ListingOptionArray";
// import { useQuery } from "@tanstack/react-query";
// import LoadingLine from "@/components/ui/LoadingLine";
// import { useLocation, useNavigate } from "react-router-dom";
// import Pagination from "@mui/material/Pagination";
// import {axios_error_handler} from "@/functions/axios_error_handler";
// import {useTranslation} from "react-i18next";


// const categoriesUrl = `${import.meta.env.VITE_SERVER_URL_CATEGORY}`;
// const shipsUrl = `${import.meta.env.VITE_SERVER_URL_LISTING}`;
//   const mainColor = "#FF385C"


// const fetshCategories = async () => {
//   const { data } = await axios.get(categoriesUrl + "/categories");
//   return data;
// }

// const fetchShips = async (page: string, listingOption: number, categoryId: number | undefined) => {
//   const toSend = categoryId
//     ? `${shipsUrl}/api/listing/listings?page=${page}&sortBy=${listingOption}&categoryId=${categoryId}`
//     : `${shipsUrl}/api/listing/listings?page=${page}&sortBy=${listingOption}`;
//   const { data } = await axios.get(
//     `${toSend}`
//   );
//   return data;
// }


// const LandingPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const pageParam = parseInt(searchParams.get("page") || "1", 10);
//   const { t } = useTranslation();
  
//   const [selectedType, setSelectedType] = useState();
//   const [listingOption, setListingOption] = useState(
//     listing_options_array[0]
//     );
//     const [currentPage, setCurrentPage] = useState(pageParam);
    
//     useEffect(() => {
//       navigate(`?page=${currentPage}`, {
//         replace: true,
//       });
//     }, [currentPage, navigate]);
    
//   // for pagination
//     const handlePageChange = useCallback(
//       (_event: React.ChangeEvent<unknown>, value: number) => {
//         setCurrentPage(value);
//       },
//       []);
  
  
  
//   const { data: shipsTypesArray, isLoading: isLoadingCategories, error: ErrorCategories } = useQuery({
//     queryKey: ["categoriesLanding"],
//     queryFn: fetshCategories
//   });
//   const { data: shipsResult, isLoading: isLoadingShips, error: ErrorShips } = useQuery({
//     queryKey: ["shipsLanding", listingOption, selectedType],
//     queryFn: () => fetchShips(currentPage.toString(), listingOption.id, selectedType),
//   });

//   useEffect(() => {
//     if (ErrorCategories) axios_error_handler(ErrorCategories, t);
//     if (ErrorShips) axios_error_handler(ErrorShips, t);
//   }, [ErrorCategories, ErrorShips]);
//   if (ErrorCategories || ErrorShips) return <div className="w-full h-screen"></div>;


//     if (isLoadingCategories || isLoadingShips)
//     return (
//       <div className="w-full h-screen">
//         <LoadingLine />
//       </div>
//     );


  

//   return (
//     <div
//       className={`content w-full mainHeightCss mt-[80px] px-[20px] flex flex-col md:px-[80px] md:mt-[90px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px]`}
//     >
//       <ShipsTypes
//         shipsTypes={shipsTypesArray}
//         selectedType={selectedType}
//         setSelectedType={setSelectedType}
//         listingOption={listingOption}
//         setListingOption={setListingOption}
//       />
//       <Ships shipsArray={shipsResult.listings} />

//       <div className="w-full flex justify-center my-10 self-end">
//         <Pagination
//           count={shipsResult.pagination.totalPages}
//           page={currentPage}
//           onChange={handlePageChange}
//           sx={{
//             direction: "ltr",
//             "& .MuiPaginationItem-root": {
//               color: "gray",
//               "&.Mui-selected": {
//                 backgroundColor: mainColor,
//                 color: "white",
//               },
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
import ShipsTypes from "../containers/landing page/ShipsTypes";
import Ships from "../containers/landing page/Ships";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import listing_options_array from "../assets/files/ListingOptionArray";
import { useQuery } from "@tanstack/react-query";
import LoadingLine from "@/components/ui/LoadingLine";
import Pagination from "@mui/material/Pagination";
import {axios_error_handler} from "@/functions/axios_error_handler";
import {useTranslation} from "react-i18next";


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

  const { t } = useTranslation();  
  const [selectedType, setSelectedType] = useState();
  const [listingOption, setListingOption] = useState(
    listing_options_array[0]
    );
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    useEffect(() => {
    }, [currentPage]);
    
  
  // for pagination
    const handlePageChange = useCallback(
      (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
      },[]);
  
  
  
  const { data: shipsTypesArray, isLoading: isLoadingCategories, error: ErrorCategories } = useQuery({
    queryKey: ["categoriesLanding"],
    queryFn: fetshCategories
  });
  const { data: shipsResult, isLoading: isLoadingShips, error: ErrorShips } = useQuery({
    queryKey: ["shipsLanding", listingOption, selectedType, currentPage],
    queryFn: () => fetchShips(currentPage.toString(), listingOption.id, selectedType),
  });

  useEffect(() => {
    if (ErrorCategories) axios_error_handler(ErrorCategories, t);
    if (ErrorShips) axios_error_handler(ErrorShips, t);
  }, [ErrorCategories, ErrorShips]);
  if (ErrorCategories || ErrorShips) return <div className="w-full h-screen"></div>;


    if (isLoadingCategories || isLoadingShips)
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );


  

  return (
    <div
      className={`content w-full mainHeightCss mt-[80px] px-[20px] flex flex-col md:px-[80px] md:mt-[90px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px]`}
    >
      <ShipsTypes
        shipsTypes={shipsTypesArray}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        listingOption={listingOption}
        setListingOption={setListingOption}
      />
      <Ships shipsArray={shipsResult.listings} />

      <div className="w-full flex justify-center my-10 self-end">
        <Pagination
          count={shipsResult.pagination.totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            direction: "ltr",
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
