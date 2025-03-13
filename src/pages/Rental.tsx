import ShipsCont from "@/containers/rental/shipsCont";
import {
  useState,
  useEffect,
  useCallback
} from "react";
import Top from "@/components/rental/Top";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSuspenseQuery } from "@tanstack/react-query";
import Pagination from "@mui/material/Pagination";
import {axios_error_handler} from "@/functions/axios_error_handler";
import {useLocation} from "react-router-dom"



const url = import.meta.env.VITE_SERVER_URL_LISTING;
const mainColor = "#FF385C";



const Rental = () => {
  
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const extractQuery = useCallback((location: any) => {
    const query = new URLSearchParams(location.search);
    const params: Record<string, string> = {};
    query.forEach((value, key) => {
      if (value !== null) {
        params[key] = value;
      }
    });
    return new URLSearchParams(params).toString();
  }, []);

  const fetshData = useCallback(async (page: number) => {
    const query = extractQuery(location);
    const { data } = await axios.get(url + "/api/listing/listings?page=" + page + query);
    return data;
  }, [location.search, extractQuery]);
  
  const { data, error } = useSuspenseQuery({
    queryKey: ["rental", location.search, currentPage],
    queryFn: () => fetshData(currentPage),
  });

  useEffect(() => {
    if (error) {
    axios_error_handler(error, t);
    }
  }, [error]);
  if (error) return <div className="w-full h-screen" />;
  

  // if (isLoading) {
  //   return (
  //     <div className="w-full min-h-screen flex justify-center items-center">
  //       <LoadingLine />
  //     </div>
  //   );
  // }


  return (
    <div
      className={`content w-full mainHeightCss mt-[80px] px-4 pb-10 flex flex-col md:px-[80px] md:mt-[90px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px]`}
    >
      <Top
        currentPage={currentPage}
        totalPages={data.pagination.totalPages}
        totalListings={data.pagination.totalItems}
      />
      {data.listings.length === 0 ? (
        <div className="w-full mainHeightCss flex justify-center items-center">
          <p className="text-lg text-gray-500">{t("no_results_found")}</p>
        </div>
      ) : (
        <ShipsCont shipsArray={data.listings} />
      )}

      <div className="w-full flex justify-center my-10">
        <Pagination
          count={data.pagination.totalPages}
          // count={10}
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
}

export default Rental











































// const query = new URLSearchParams(location.search);
// const page = query.get("page") || "";
// const when = query.get("when") || "";
// const where = query.get("where") || "";
// const who = query.get("who") || "";
// const capacity = query.get("capacity") || "";
// const minRating = query.get("minRating") || "";
// const maxRating = query.get("maxRating") || "";
// const availability = query.get("availability") || "";
// const minPrice = query.get("minPrice") || "";
// const maxPrice = query.get("maxPrice") || "";

// const params = { page, when, where, who, capacity, minRating, maxRating, availability, minPrice, maxPrice };
// const queryString = new URLSearchParams(params).toString();

// return queryString;

          












            // const [loading, setLoading] = useState(true);
            // const [totalPages, setTotalPages] = useState(1);
            // const [totalListings, setTotalListings] = useState(0);
            // const [shipsArray, setShipsArray] = useState([]);
              // const location = useLocation();
              // const navigate = useNavigate();
              // const query = new URLSearchParams(location.search);
              // const page = query.get("page");
            //   const when = query.get("when");
            //   const where = query.get("where");
            // const who = query.get("who");
            // const capacity = query.get("capacity");
            // const minRating = query.get("minRating");
            // const maxRating = query.get("maxRating");
            // const availability = query.get("availability");
            // const minPrice = query.get("minPrice");
            // const maxPrice = query.get("maxPrice");
          
          
            // const fetshData = async () => {
          
            //   if (when) query.set("when", when);
            //   if (where) query.set("where", where);
            //   if (who) query.set("who", who);
            //   if (capacity) query.set("capacity", capacity);
            //   if (minRating) query.set("minRating", minRating);
            //   if (maxRating) query.set("maxRating", maxRating);
            //   if (availability) query.set("availability", availability);
            //   if (minPrice) query.set("minPrice", minPrice);
            //   if (maxPrice) query.set("maxPrice", maxPrice);
            //   query.set("page", currentPage.toString());
          
              
              
          
            //   axios.get(url + "/api/listing/listings?" + query.toString())
            //   .then((response) => {
            //     setShipsArray(response.data.listings);
            //     (response.data.pagination.totalPages && setTotalPages(response.data.pagination.totalPages))
            //     setTotalListings(response.data.pagination.totalItems);
            //     setLoading(false);
            //   })
            //   .catch((error) => {
            //       if (error.message === "Network Error") {
            //         Swal.fire({
            //           icon: "error",
            //           title: t("network_error"),
            //           text: t("please_try_again"),
            //           customClass: {
            //             confirmButton: "custom-confirm-button",
            //           },
            //         });
            //       }
            //   })
            //  }
          
          
          
              // useEffect(() => {
              //     if (!page) {
              //         query.set("page", "1");
              //         navigate(`${location.pathname}?${query.toString()}`, {
              //           replace: true,
              //         });
              //         return
              //     }
              //     if (Number(page) > totalPages || Number(page) < 1) {
              //           query.set("page", "1");
              //           navigate(`${location.pathname}?${query.toString()}`, {
              //             replace: true,
              //           });
              //         return
              //     }
              //     setCurrentPage(Number(page));
              // }, []);
            
            
            // useEffect(() => { 
            //   fetshData();
            // }, [page])
          
          
            //   useEffect(() => {
            //        query.set("page", currentPage.toString());
            //        navigate(`${location.pathname}?${query.toString()}`, {
            //          replace: true,
            //        });
            //    }, [currentPage]);
          
            // if (loading) { 
            //   return (
            //     <div className="w-full min-h-screen flex justify-center items-center">
            //       <LoadingLine/>
            //     </div>
            //   )
            // }
          
          
          
            // console.log(shipsArray);