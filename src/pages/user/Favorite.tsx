import ShipsCont from "@/containers/rental/shipsCont";
// import Pagination from "@/components/ui/Pagination";
import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingLine from "@/components/ui/LoadingLine";
import axios from "axios";
// import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import isLoggedIn from "../../lib/isLogedin";

const Favorite = () => {

    const { t } = useTranslation();
    const [shipsArray, setShipsArray] = useState([]);
    const urlListing = import.meta.env.VITE_SERVER_URL_LISTING;
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    // const location = useLocation();
    const navigate = useNavigate();


    const fetshData = async () => { 
        axios
          .get(`${urlListing}/api/favourites`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          })
          .then((res) => {
            // console.log(res.data);
            setShipsArray(res.data.listings);
            // setTotalPages(res.data.pagination.totalPages);
            setLoading(false);
          })
            .catch((err) => {
              console.log(err);
          });
    }

    useEffect(() => { 
        if (!isLoggedIn()) {
            return navigate("/?page=1");
          }
          fetshData();
    }, []);

    // useEffect(() => {
    //     if (!isLoggedIn()) {
    //       return navigate("/?page=1");
    //     }
    //     const query = new URLSearchParams(location.search);
    //     const page = query.get("page");
    //     if (page) {
    //       const pageNumber = Number(page);
    //       if (pageNumber > 0 && pageNumber <= totalPages) {
    //         setCurrentPage(pageNumber);
    //       } else {
    //         navigate(`?page=1`, { replace: true });
    //       }
    //     } else {
    //       navigate(`?page=${currentPage}`, { replace: true });
    //     }
    //   }, [location.search, totalPages, navigate]);

    //   useEffect(() => {
    //     setLoading(true);
    //     fetshData(currentPage);
    //   }, [ currentPage]);

    //   useEffect(() => {
    //     navigate(`?page=${currentPage}`, { replace: true });
    //   }, [currentPage, navigate]);

      if (loading)
        return (
          <div className="w-full h-screen">
            <LoadingLine />
          </div>
        );


  return (
    <div
      className={`content w-full mt-[90px] px-[20px] pb-10 flex flex-col md:px-[80px] md:mt-[100px] lg:px-[120px] lg:mt-[105px] 2xl:px-[220px]`}
    >
      <p className="font-semibold text-[26px] lg:text-[25px]">
        {t("favorite")}
          </p>
          <div className="ships mt-[-50px]">
            <ShipsCont shipsArray={shipsArray} />
          </div>
      
      {/* <div className="pagination w-full mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div> */}
    </div>
  );
};
export default Favorite;
